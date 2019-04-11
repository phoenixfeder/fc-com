package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import server.entities.dto.response.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    @JsonProperty("status")
    private StatusResponse statusResponse;
    @JsonProperty("register")
    private RegisterResponse registerResponse;

    @JsonProperty("user")
    private UserResponse userResponse;

    @JsonProperty("flashcardboxes")
    private List<Box> boxes;

    public ResponseDTO(StatusResponse statusResponse) {
        this.statusResponse = statusResponse;
    }
}
