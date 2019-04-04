package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.Session;
import server.entities.dto.request.UserRequest;
import server.exceptions.FccExcpetion;
import server.exceptions.WrongFormatException;

@Getter
public class RequestDTO {
    @JsonProperty("register")
    RegisterRequest registerRequest;
    @JsonProperty("user")
    UserRequest userRequest;
    @JsonProperty("authentication")
    Session session;

    public UserRequest getUserInRegisterRequest() throws WrongFormatException {

        try{
            return registerRequest.getUserRequest();
        }catch(NullPointerException e){
            throw new WrongFormatException();
        }
    }


}
