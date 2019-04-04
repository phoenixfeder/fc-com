package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.UserResponse;
import server.exceptions.*;
import server.modules.dbConnector.TokenConnector;
import server.modules.dbConnector.UserConnector;
import server.modules.utils.StatusDTO;

import java.time.LocalDateTime;

@Service
public class AccountService {

    private final RegisterComponent registerComponent;
    private final TokenComponent tokenComponent;

    private final UserConnector userConnector;
    private final TokenConnector tokenConnector;


    @Autowired
    public AccountService(RegisterComponent registerComponent, TokenComponent tokenComponent, UserConnector userConnector, TokenConnector tokenConnector) {
        this.registerComponent = registerComponent;
        this.tokenComponent = tokenComponent;

        this.userConnector = userConnector;
        this.tokenConnector = tokenConnector;
    }


    public ResponseDTO newAccount(RequestDTO requestDTO) throws FccExcpetion {
        //Entries Check
        RegisterRequest registerRequest;
        RegisterResponse registerResponse;
        try {
            registerRequest = requestDTO.getRegisterRequest();
            registerResponse = registerComponent.checkEntriesAndGetResponse(registerRequest);
        }catch(Exception e){
            throw new WrongFormatException();
        }

        if (!registerResponse.isOk()) {
            throw new RegisterErrorException(registerResponse);
        }

        //Create new User
        UserRequest userRequest = registerRequest.getUserRequest();
        User savedUser = registerComponent.createNewUser(userRequest);

        //Send Mail
        if (!registerComponent.sendVerificationMail(savedUser)) {
            throw new EmailSendException();
        }

        //Return Response
        ResponseDTO responseDTO = StatusDTO.OK();
        responseDTO.setRegisterResponse(registerResponse);
        responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));
        return responseDTO;
    }

    public void editAccount() {

    }

    public void closeAccount() {

    }

    public ResponseDTO verifyAccount(String requestId, String requestToken) {
        //Format Check
        if (requestId == null || requestToken == null) {
            return StatusDTO.MISSINGPARAMS();
        }
        long id;
        try {
            id = Long.parseLong(requestId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            return StatusDTO.MISSINGPARAMS();
        }

        User user = userConnector.getUserByID(id);
        VerificationToken token = tokenConnector.getTokenByUser(user);

        //Verify Entries
        if(!tokenComponent.isTokenValid(user, token, requestToken)){
            return StatusDTO.VERIFYERROR();
        }

        //Verify Time
        if(tokenComponent.hasTokenExpired(token)){
            return StatusDTO.TOKENEXPIRED();
        }

        //Enable User
        user.setEnabled(true);
        userConnector.save(user);
        tokenConnector.delete(token);

        //Response
        ResponseDTO responseDTO = StatusDTO.OK();
        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setUserResponse(new UserResponse(user.getUsername()));
        responseDTO.setRegisterResponse(registerResponse);
        return responseDTO;


    }

    public ResponseDTO sendNewToken(RequestDTO requestDTO) throws FccExcpetion {

        //Format Check
        String mail;
        try{
            mail = requestDTO.getRegisterRequest().getUserRequest().getEmail();
        }catch(NullPointerException e){
            throw new WrongFormatException();
        }

        //Get User
        User user = userConnector.getUserByEmail(mail);
        if(user == null) throw new EmailNotInUseException();

        //Get Token
        VerificationToken verificationToken = tokenConnector.getTokenByUser(user);
        if(verificationToken == null) throw new UserEnabledException();

        if(verificationToken.getExpiryDate().isAfter(LocalDateTime.now())){
            throw new TokenNotExpiredException();
        }

        tokenConnector.delete(verificationToken);
        tokenConnector.save(new VerificationToken(user));

        if (!registerComponent.sendVerificationMail(user)) {
            throw new EmailSendException();
        }

        return StatusDTO.OK();
    }
}
