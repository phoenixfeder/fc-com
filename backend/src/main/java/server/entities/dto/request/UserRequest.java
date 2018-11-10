package server.entities.dto.request;

import lombok.Getter;

@Getter
public class User {
    private String userName;
    private String email;
    private String password;
}
