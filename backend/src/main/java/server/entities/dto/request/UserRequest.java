package server.entities.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserRequest {
    private String username;
    private String email;
    private String password;
    private String oldPassword;

    private String realName;
    private String interest;
    private LocalDate dateOfBirth;

    private String session;
    private String sessionHash;
    private Long userID;
}
