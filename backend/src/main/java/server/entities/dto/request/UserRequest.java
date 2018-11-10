package server.entities.dto.request;

import lombok.Getter;

@Getter
public class UserRequest {
    private String username;
    private String email;
    private String password;
}
