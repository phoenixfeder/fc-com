package server.exceptions;

import server.entities.dto.response.UserResponse;

public class EditProfileException extends FccExcpetion {
    public UserResponse userResponse;
    public EditProfileException(UserResponse userResponse){
        this.userResponse = userResponse;
    }
}
