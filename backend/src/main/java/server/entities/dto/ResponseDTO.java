package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    @JsonProperty("status")
    StatusResponse statusResponse;
    @JsonProperty("register")
    RegisterResponse registerResponse;

    @JsonProperty("user")
    UserResponse userResponse;

    public ResponseDTO(StatusResponse statusResponse) {
        this.statusResponse = statusResponse;
    }
}
