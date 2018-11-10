package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import server.entities.dto.request.RegisterRequest;

@Getter
public class RequestDTO {
    @JsonProperty("register")
    RegisterRequest registerRequest;

}
