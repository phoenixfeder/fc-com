package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import server.entities.User;
import server.entities.dto.request.UserRequest;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private String username;
    private String email;

    private String realName;
    private String interest;
    private String birthday;

    private String session;
    private String sessionHash;

    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private long userID;

    private String oldPasswordErrorMsg;
    private String newPasswordErrorMsg;
    private String newEmailErrorMsg;

    public UserResponse(UserRequest userRequest) {
        this.username = userRequest.getUsername();
        this.email = userRequest.getEmail();
    }

    public UserResponse(User user) {
        this.userID = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.realName = user.getRealName();
        this.interest = user.getInterest(); // == null ? "" : user.getInterest();
        if (!(user.getDateOfBirth() == null)) {
            this.birthday = user.getDateOfBirth().toString();
        }
    }

    public UserResponse(User user, String session) {
        this(user);
        this.session = session;
        this.sessionHash = "";
        this.userID = user.getId();
    }

    public UserResponse() {
        super();
    }

    public UserResponse(String username) {
        this.username = username;
    }

    @JsonIgnore
    public boolean isOK() {
        return (oldPasswordErrorMsg == null && newPasswordErrorMsg == null && newEmailErrorMsg == null);
    }
}
