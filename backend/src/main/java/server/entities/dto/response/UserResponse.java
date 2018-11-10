package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import server.entities.dto.request.UserRequest;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private String username;
    private String email;

    public UserResponse(String username, String email, String password) {
        this.username = username;
        this.email = email;
    }

    public UserResponse(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
    }
}
