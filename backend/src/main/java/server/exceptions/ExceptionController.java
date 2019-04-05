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
}
