package server.entities.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class RegisterRequest {
    @JsonProperty("user")
    private UserRequest userRequest;
}
