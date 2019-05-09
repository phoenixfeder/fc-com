package server.modules.utils;

import server.config.StatusCode;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;

public class StatusDTO {


    public static ResponseDTO formatError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.FORMATERROR));
    }

    public static ResponseDTO registerError(RegisterResponse registerResponse) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.REGISTERERROR));
        responseDTO.setRegisterResponse(registerResponse);
        return responseDTO;
    }

    public static ResponseDTO emailSendError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.EMAILSENDERROR));
    }

    public static ResponseDTO missingParamsError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.MISSINGPARAMS));
    }

    public static ResponseDTO ok() {
        return new ResponseDTO(StatusResponse.create(StatusCode.OK));
    }

    public static ResponseDTO tokenExpiresError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.TOKENEXPIRED));
    }

    public static ResponseDTO verifyError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.VERIFYERROR));
    }

    public static ResponseDTO emailNotInUseError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.EMAILNOTINUSE));
    }

    public static ResponseDTO tokenNotExpiredError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.TOKENNOTEXPIREDYET));
    }

    public static ResponseDTO userEnabledError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.USERENABLEDERROR));
    }

    public static ResponseDTO permissionDeniedError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.PERMISSIONDENIED));
    }

    public static ResponseDTO wrongUsernameOrPassword() {
        return new ResponseDTO(StatusResponse.create(StatusCode.WRONGUNORPW));
    }

    public static ResponseDTO userIsNotEnabledError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.USERNOTENABLED));
    }

    public static ResponseDTO okWithSession(String hash, String session, String username, long id) {
        ResponseDTO responseDTO = ok();
        responseDTO.getStatusResponse().setSession(new server.entities.dto.response.Session());
        responseDTO.getStatusResponse().getSession().setHash(hash);
        responseDTO.getStatusResponse().getSession().setSession(session);
        responseDTO.getStatusResponse().getSession().setUsername(username);
        responseDTO.getStatusResponse().getSession().setId(id);

        return responseDTO;
    }

    public static ResponseDTO wrongPasswordError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.WRONGPASSWORDERROR));
    }

    public static ResponseDTO editProfileError(UserResponse userResponse) {
        ResponseDTO responseDTO = new ResponseDTO(StatusResponse.create(StatusCode.EDITPROFILEERROR));
        responseDTO.setUserResponse(userResponse);
        return responseDTO;
    }

    public static ResponseDTO userNotFoundError() {
        return new ResponseDTO(StatusResponse.create(StatusCode.USERNOTFOUNDERROR));
    }
}
