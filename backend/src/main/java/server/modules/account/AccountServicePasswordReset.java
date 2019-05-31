package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.entities.ResetPasswordToken;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.request.UserRequest;
import server.exceptions.FccExcpetion;
import server.exceptions.WrongFormatException;
import server.modules.authentication.Authenticator;
import server.modules.dbconnector.ResetPasswordTokenConnector;
import server.modules.dbconnector.UserConnector;
import server.modules.utils.DTOContentParser;
import server.modules.utils.StatusDTO;

@Service
public class AccountServicePasswordReset {

    private final RegisterComponent registerComponent;
    private final UserConnector userConnector;
    private final ResetPasswordTokenConnector resetPasswordTokenConnector;
    private final Authenticator authenticator;

    @Autowired
    public AccountServicePasswordReset(RegisterComponent registerComponent, UserConnector userConnector, ResetPasswordTokenConnector resetPasswordTokenConnector, Authenticator authenticator) {
        this.registerComponent = registerComponent;
        this.userConnector = userConnector;
        this.resetPasswordTokenConnector = resetPasswordTokenConnector;
        this.authenticator = authenticator;
    }

    public ResponseDTO resetPassword(RequestDTO requestDTO) throws FccExcpetion{

        //Prüfe mail
        //String mail = DTOContentParser.getMail(requestDTO);
        UserRequest userRequest = DTOContentParser.getUserRequest(requestDTO);
        String mail = userRequest.getEmail();

        User user = userConnector.getUserByEmail(mail);

        if(user == null){
            return StatusDTO.emailNotInUseError();
        }

        //Erstelle Token
        ResetPasswordToken resetPasswordToken = new ResetPasswordToken(user);
        //TODO: DELETE DEBUG
        if (user.getUsername().equals("enableduser")) {
            resetPasswordToken.setToken("debugging");
        }
        resetPasswordTokenConnector.save(resetPasswordToken);

        //Sende mail
        registerComponent.sendNewPasswordMail(user);

        return StatusDTO.ok();
    }

    public ResponseDTO verifyResetPassword(Long id, String requestToken, String newPassword) throws FccExcpetion {
        User user = userConnector.getUserByID(id);
        ResetPasswordToken token = resetPasswordTokenConnector.getTokenByUser(user);
        //Verify Entries
        TokenComponent.verifyToken(user, requestToken, token);

        //Save new password
        user.setPassword(authenticator.encodePassword(newPassword));
        userConnector.save(user);

        //delete token
        resetPasswordTokenConnector.delete(token);

        //Response
        return StatusDTO.ok();
    }

    public String parsePassword(RequestDTO requestDTO) throws FccExcpetion{
        UserRequest userRequest = DTOContentParser.getUserRequest(requestDTO);
        return userRequest.getPassword();
    }

    public void checkPassword(String password) throws FccExcpetion {
        if(registerComponent.isPasswordLengthIncorrect(password)){
            throw new WrongFormatException();
        }
    }
}
