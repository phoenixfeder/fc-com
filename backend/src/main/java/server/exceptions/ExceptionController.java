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
        System.out.println("Error :D");
        return StatusDTO.FORMATERROR();
    }
}
