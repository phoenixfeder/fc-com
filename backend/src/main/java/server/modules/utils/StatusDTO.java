package server.modules.utils;

import server.config.StatusCode;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;

public class StatusDTO {


    public static ResponseDTO FORMATERROR(){
        return new ResponseDTO(StatusResponse.create(StatusCode.FORMATERROR));
    }

    public static ResponseDTO REGISTERERROR(RegisterResponse registerResponse) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.REGISTERERROR));
        responseDTO.setRegisterResponse(registerResponse);
        return responseDTO;
    }

    public static ResponseDTO EMAILSENDERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.EMAILSENDERROR));
    }

    public static ResponseDTO MISSINGPARAMS() {
        return new ResponseDTO(StatusResponse.create(StatusCode.MISSINGPARAMS));
    }

    public static ResponseDTO OK() {
        return new ResponseDTO(StatusResponse.create(StatusCode.OK));
    }

    public static ResponseDTO TOKENEXPIRED() {
        return new ResponseDTO(StatusResponse.create(StatusCode.TOKENEXPIRED));
    }

    public static ResponseDTO VERIFYERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.VERIFYERROR));
    }

    public static ResponseDTO EMAILNOTINUSEERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.EMAILNOTINUSE));
    }

    public static ResponseDTO TOKENNOTEXPIREDERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.TOKENNOTEXPIREDYET));
    }

    public static ResponseDTO USERENABLEDERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.USERENABLEDERROR));
    }

    public static ResponseDTO PERMISSIONEDENIED() {
        return new ResponseDTO(StatusResponse.create(StatusCode.PERMISSIONDENIED));
    }

    public static ResponseDTO WRONGUSERNAMEORPASSWORD() {
        return new ResponseDTO(StatusResponse.create(StatusCode.WRONGUNORPW));
    }

    public static ResponseDTO USERISNOTENABLEDERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.USERNOTENABLED));
    }

    public static ResponseDTO OKWITHSESSION(String hash, String session, String username, long id) {
        ResponseDTO responseDTO = OK();
        responseDTO.getStatusResponse().setSession(new server.entities.dto.response.Session());
        responseDTO.getStatusResponse().getSession().setHash(hash);
        responseDTO.getStatusResponse().getSession().setSession(session);
        responseDTO.getStatusResponse().getSession().setUsername(username);
        responseDTO.getStatusResponse().getSession().setId(id);

        return responseDTO;
    }

    public static ResponseDTO WRONGPASSWORDERROR() {
        return new ResponseDTO(StatusResponse.create(StatusCode.WRONGPASSWORDERROR));
    }

    public static ResponseDTO EDITPROFILEERROR(UserResponse userResponse) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.EDITPROFILEERROR));
        responseDTO.setUserResponse(userResponse);
        return responseDTO;
    }
}
