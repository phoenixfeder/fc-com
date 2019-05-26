package server.exceptions;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import server.entities.dto.ResponseDTO;
import server.modules.utils.StatusDTO;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler({WrongFormatException.class})
    public @ResponseBody
    ResponseDTO wrongFormatException() {
        System.out.println("Format Error");
        return StatusDTO.formatError();
    }

    @ExceptionHandler({RegisterErrorException.class})
    public @ResponseBody
    ResponseDTO registerErrorException(RegisterErrorException e) {
        System.out.println("Register Error");
        return StatusDTO.registerError(e.getRegisterResponse());
    }

    @ExceptionHandler({EditProfileException.class})
    public @ResponseBody
    ResponseDTO editProfileException(EditProfileException e) {
        System.out.println("Edit Profile Error");
        return StatusDTO.editProfileError(e.getUserResponse());
    }

    @ExceptionHandler({EmailSendException.class})
    public @ResponseBody
    ResponseDTO emailSendException() {
        System.out.println("Email-Send Error");
        return StatusDTO.emailSendError();
    }

    @ExceptionHandler({EmailNotInUseException.class})
    public @ResponseBody
    ResponseDTO emailNotInUseException() {
        System.out.println("Email not in use Error");
        return StatusDTO.emailNotInUseError();
    }

    @ExceptionHandler({TokenNotExpiredException.class})
    public @ResponseBody
    ResponseDTO tokenNotExpiredException() {
        System.out.println("Email-Send Error");
        return StatusDTO.tokenNotExpiredError();
    }

    @ExceptionHandler({UserEnabledException.class})
    public @ResponseBody
    ResponseDTO userEnabledException() {
        System.out.println("User enabled Error");
        return StatusDTO.userEnabledError();
    }

    @ExceptionHandler({PermissionDeniedException.class})
    public @ResponseBody
    ResponseDTO permissionDenied() {
        System.out.println("Permission denied");
        return StatusDTO.permissionDeniedError();
    }

    @ExceptionHandler({WrongUsernameOrPasswordException.class})
    public @ResponseBody
    ResponseDTO wrongUsernameOrPassword() {
        System.out.println("Wrong Username or Password Error");
        return StatusDTO.wrongUsernameOrPassword();
    }

    @ExceptionHandler({UserNotEnabledException.class})
    public @ResponseBody
    ResponseDTO userNotEnabledException() {
        System.out.println("User is not enabled Error");
        return StatusDTO.userIsNotEnabledError();
    }

    @ExceptionHandler({WrongPasswordException.class})
    public @ResponseBody
    ResponseDTO wrongPasswordException() {
        System.out.println("Wrong Password Error");
        return StatusDTO.wrongPasswordError();
    }

    @ExceptionHandler({UserNotFoundException.class})
    public @ResponseBody
    ResponseDTO userNotFoundException() {
        System.out.println("User Not Found Error");
        return StatusDTO.userNotFoundError();
    }
}
