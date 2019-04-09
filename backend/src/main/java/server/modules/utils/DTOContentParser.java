package server.modules.utils;

import server.entities.dto.RequestDTO;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.exceptions.FccExcpetion;
import server.exceptions.WrongFormatException;

import javax.validation.constraints.Null;

public class DTOContentParser {
    public static RegisterRequest getRegisterRequest(RequestDTO requestDTO) throws WrongFormatException {
        try{
            RegisterRequest registerRequest = requestDTO.getRegisterRequest();
            return registerRequest;
        }catch(NullPointerException e){
            throw new WrongFormatException();
        }
    }
    public static UserRequest getUserRequest(RegisterRequest registerRequest) throws WrongFormatException {
        try{
            UserRequest userRequest = registerRequest.getUserRequest();
            return userRequest;
        }catch(NullPointerException e){
            throw new WrongFormatException();
        }
    }

    public static String getMail(RequestDTO requestDTO) throws WrongFormatException{
        try{
            String mail = getUserRequest(getRegisterRequest(requestDTO)).getEmail();
            if(mail == null){
                throw new WrongFormatException();
            }
            return mail;
        }catch(NullPointerException e){
            throw new WrongFormatException();
        }
    }
}
