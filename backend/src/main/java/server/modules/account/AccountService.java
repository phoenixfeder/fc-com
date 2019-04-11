package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.config.StatusCode;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;
import server.exceptions.*;
import server.modules.authentication.Authenticator;
import server.modules.dbConnector.SessionConnector;
import server.modules.dbConnector.TokenConnector;
import server.modules.dbConnector.UserConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

import java.time.LocalDateTime;

@Service
public class AccountService {

    private final RegisterComponent registerComponent;
    private final TokenComponent tokenComponent;

    private final Authenticator authenticator;

    private final UserConnector userConnector;
    private final TokenConnector tokenConnector;
    private final SessionConnector sessionConnector;


    @Autowired
    public AccountService(RegisterComponent registerComponent, TokenComponent tokenComponent, Authenticator authenticator, UserConnector userConnector, TokenConnector tokenConnector, SessionConnector sessionConnector) {
        this.registerComponent = registerComponent;
        this.tokenComponent = tokenComponent;

        this.authenticator = authenticator;

        this.userConnector = userConnector;
        this.tokenConnector = tokenConnector;
        this.sessionConnector = sessionConnector;
    }

    public ResponseDTO newAccount(RequestDTO requestDTO) throws FccExcpetion {

        //Entries Check
        RegisterRequest registerRequest = DTOContentParser.getRegisterRequest(requestDTO);
        UserRequest userRequest = DTOContentParser.getRegisterUserRequest(registerRequest);
        RegisterResponse registerResponse = registerComponent.checkEntriesAndGetResponse(userRequest);

        //Create new User
        User savedUser = registerComponent.createNewUser(userRequest);

        //Send Mail
        registerComponent.sendVerificationMail(savedUser);

        //Return Response
        ResponseDTO responseDTO = StatusDTO.OK();
        responseDTO.setRegisterResponse(registerResponse);
        responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));
        return responseDTO;
    }

    public void editAccount(RequestDTO requestDTO) throws FccExcpetion{
        User user = authenticator.authenticate(requestDTO);
    }

    public ResponseDTO closeAccount(RequestDTO requestDTO) throws FccExcpetion{
        User user = authenticator.authenticate(requestDTO);

        if(!authenticator.isPasswordCorrect(user, DTOContentParser.getUserRequest(requestDTO).getOldPassword())){
            throw new WrongPasswordException();
        }

        sessionConnector.deleteByUser(user);
        userConnector.delete(user);

        return StatusDTO.OK();
    }

    public ResponseDTO verifyAccount(String requestId, String requestToken) {
        //Format Check
        //TODO Noch unschön
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

        String mail = DTOContentParser.getMail(requestDTO);

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

        registerComponent.sendVerificationMail(user);

        return StatusDTO.OK();
    }

    public ResponseDTO getAccount(RequestDTO requestDTO) throws FccExcpetion{
        User user = authenticator.authenticate(requestDTO);

        ResponseDTO responseDTO = StatusDTO.OK();
        responseDTO.setUserResponse(new UserResponse(user));
        return responseDTO;
    }
}
