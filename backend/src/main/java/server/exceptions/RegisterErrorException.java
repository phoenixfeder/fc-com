package server.exceptions;

import server.entities.dto.response.RegisterResponse;

public class RegisterErrorException extends FccExcpetion {
    public RegisterResponse registerResponse;
    public RegisterErrorException(RegisterResponse registerResponse) {
        this.registerResponse = registerResponse;
    }
}
