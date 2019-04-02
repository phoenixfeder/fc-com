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
import server.modules.dbConnector.TokenConnector;
import server.modules.dbConnector.UserConnector;
import server.modules.utils.DTOVerifier;
import server.modules.utils.StatusDTO;

@Service
public class AccountService {

    private final DTOVerifier dtoVerifier;
    private final RegisterComponent registerComponent;
    private final TokenComponent tokenComponent;

    private final UserConnector userConnector;
    private final TokenConnector tokenConnector;


    @Autowired
    public AccountService(DTOVerifier dtoVerifier, RegisterComponent registerComponent, TokenComponent tokenComponent, UserConnector userConnector, TokenConnector tokenConnector) {
        this.dtoVerifier = dtoVerifier;
        this.registerComponent = registerComponent;
        this.tokenComponent = tokenComponent;

        this.userConnector = userConnector;
        this.tokenConnector = tokenConnector;
    }


    public ResponseDTO newAccount(RequestDTO requestDTO) {

        // Format Check
        if (!dtoVerifier.isFormatForRegisterCorrect(requestDTO)) {
            return StatusDTO.FORMATERROR();
        }

        //Entries Check
        RegisterRequest registerRequest = requestDTO.getRegisterRequest();
        RegisterResponse registerResponse = registerComponent.checkEntriesAndGetResponse(registerRequest);

        if (!registerResponse.isOk()) {
            return StatusDTO.REGISTERERROR(registerResponse);
        }

        //Create new User
        UserRequest userRequest = registerRequest.getUserRequest();
        User savedUser = registerComponent.createNewUser(userRequest);

        //Send Mail
        if (!registerComponent.sendVerificationMail(savedUser)) {
            return StatusDTO.EMAILSENDERROR();
        }

        //Return Response
        ResponseDTO responseDTO = StatusDTO.OK();
        responseDTO.setRegisterResponse(registerResponse);
        responseDTO.getRegisterResponse().setUserResponse(new UserResponse(userRequest));
        return responseDTO;
    }

    public void editAccount() {

    }

    public void deleteAccount() {

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
        if(tokenComponent.hasTokenExpired(requestToken)){
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
}
