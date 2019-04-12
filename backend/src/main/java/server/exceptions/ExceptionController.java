package server.exceptions;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import server.entities.dto.ResponseDTO;
import server.modules.utils.StatusDTO;

@ControllerAdvice
public class ExceptionController{

    @ExceptionHandler({WrongFormatException.class})
    public @ResponseBody ResponseDTO wrongFormatException(){
        System.out.println("Format Error");
        return StatusDTO.FORMATERROR();
    }

    @ExceptionHandler({RegisterErrorException.class})
    public @ResponseBody ResponseDTO registerErrorException(RegisterErrorException e){
        System.out.println("Register Error");
        return StatusDTO.REGISTERERROR(e.registerResponse);
    }

    @ExceptionHandler({EmailSendException.class})
    public @ResponseBody ResponseDTO emailSendException(){
        System.out.println("Email-Send Error");
        return StatusDTO.EMAILSENDERROR();
    }

    @ExceptionHandler({EmailNotInUseException.class})
    public @ResponseBody ResponseDTO emailNotInUseException(){
        System.out.println("Email not in use Error");
        return StatusDTO.EMAILNOTINUSEERROR();
    }

    @ExceptionHandler({TokenNotExpiredException.class})
    public @ResponseBody ResponseDTO tokenNotExpiredException(){
        System.out.println("Email-Send Error");
        return StatusDTO.TOKENNOTEXPIREDERROR();
    }

    @ExceptionHandler({UserEnabledException.class})
    public @ResponseBody ResponseDTO userEnabledException(){
        System.out.println("User enabled Error");
        return StatusDTO.USERENABLEDERROR();
    }

    @ExceptionHandler({PermissionDeniedException.class})
    public @ResponseBody ResponseDTO permissionDenied(){
        System.out.println("Permission denied");
        return StatusDTO.PERMISSIONEDENIED();
    }

    @ExceptionHandler({WrongUsernameOrPasswordException.class})
    public @ResponseBody ResponseDTO wrongUsernameOrPassword(){
        System.out.println("Wrong Username or Password Error");
        return StatusDTO.WRONGUSERNAMEORPASSWORD();
    }

    @ExceptionHandler({UserNotEnabledException.class})
    public @ResponseBody ResponseDTO userNotEnabledException(){
        System.out.println("User is not enabled Error");
        return StatusDTO.USERISNOTENABLEDERROR();
    }

    @ExceptionHandler({WrongPasswordException.class})
    public @ResponseBody ResponseDTO wrongPasswordException(){
        System.out.println("Wrong Password Error");
        return StatusDTO.WRONGPASSWORDERROR();
    }
}
