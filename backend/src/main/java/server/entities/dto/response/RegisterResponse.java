package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterResponse {
    private String messageUsername;
    private String messageEmail;
    private String messagePassword;

    @JsonProperty("user")
    private UserResponse userResponse;

    public boolean isOk() {
        return (messageUsername == null && messageEmail == null && messagePassword == null);
    }
}
