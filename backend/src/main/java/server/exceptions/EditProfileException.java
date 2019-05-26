package server.exceptions;

import server.entities.dto.response.UserResponse;

public class EditProfileException extends FccExcpetion {
    private UserResponse userResponse;

    public EditProfileException(UserResponse userResponse) {
        this.userResponse = userResponse;
    }

    public UserResponse getUserResponse() {
        return userResponse;
    }
}
