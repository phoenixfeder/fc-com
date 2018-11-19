package server.services;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import server.config.Lang;
import server.config.StatusCode;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.exceptions.UsernameTooShortLong;

@ControllerAdvice
@RestController
public class ResponsiveExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public final ResponseDTO usernameExists(){
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.REGISTERERROR));
        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setMessageUsername(Lang.UsernameIsTaken);
        responseDTO.setRegisterResponse(registerResponse);

        return responseDTO;
    }

    @ExceptionHandler(UsernameTooShortLong.class)
    public final ResponseDTO usernameTooShortLong(){
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.REGISTERERROR));
        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setMessageUsername(Lang.UsernameTooShort);
        responseDTO.setRegisterResponse(registerResponse);

        return responseDTO;
    }
}
