package server.modules.account;

import server.config.Lang;
import server.entities.User;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.UserResponse;
import server.exceptions.WrongFormatException;
import server.modules.authentication.Authenticator;

public class Profile {

    public static User updateNonSensitiveData(UserRequest userRequest, User user) throws WrongFormatException {
        try {
            if (userRequest.getDateOfBirth() != null) {
                user.setDateOfBirth(userRequest.getDateOfBirth());
            }
            if (userRequest.getRealName() != null) {
                user.setRealName(userRequest.getRealName());
            }
            if (userRequest.getInterest() != null) {
                user.setInterest(userRequest.getInterest());
            }
            return user;
        } catch (Exception e) {
            throw new WrongFormatException();
        }
    }

    public static User updateSensitiveData(UserRequest userRequest, User user, Authenticator authenticator) {
        if (userRequest.getPassword() != null) {
            user.setPassword(authenticator.encodePassword(userRequest.getPassword()));
        }
        if (userRequest.getEmail() != null) {
            user.setEmail(userRequest.getEmail());
        }

        return user;
    }

    public static void checkOldPassword(User user, UserRequest userRequest, UserResponse userResponse, Authenticator authenticator) {
        if (!authenticator.isPasswordCorrect(user, userRequest.getOldPassword())) {
            userResponse.setOldPasswordErrorMsg(Lang.PasswordIncorrect);
        }
    }

    public static void checkMail(User user, UserRequest userRequest, UserResponse userResponse, RegisterComponent registerComponent) {
        if (userRequest.getEmail() != null) {
            if (registerComponent.isEmailTaken(userRequest.getEmail()) && !(userRequest.getEmail().equals(user.getEmail()))) {
                userResponse.setNewEmailErrorMsg(Lang.EmailIsTaken);
            }
            if (registerComponent.isEmailIncorrect(userRequest.getEmail())) {
                userResponse.setNewEmailErrorMsg(Lang.EmailFormat);
            }
        }
    }

    public static void checkNewPassword(UserRequest userRequest, UserResponse userResponse, RegisterComponent registerComponent) {
        if (userRequest.getPassword() != null && registerComponent.isPasswordLengthIncorrect(userRequest.getPassword())) {
            userResponse.setNewPasswordErrorMsg(Lang.PasswordTooShort);
        }
    }
}
