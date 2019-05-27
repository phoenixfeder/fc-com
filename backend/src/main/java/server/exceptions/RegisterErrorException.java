package server.exceptions;

import server.entities.dto.response.RegisterResponse;

public class RegisterErrorException extends FccExcpetion {
    private RegisterResponse registerResponse;

    public RegisterErrorException(RegisterResponse registerResponse) {
        this.registerResponse = registerResponse;
    }

    public RegisterResponse getRegisterResponse() {
        return registerResponse;
    }
}
