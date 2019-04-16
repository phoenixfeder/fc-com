package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.Session;
import server.entities.dto.request.UserRequest;

@Getter
public class RequestDTO {
    @JsonProperty("register")
    private RegisterRequest registerRequest;
    @JsonProperty("user")
    private UserRequest userRequest;
    @JsonProperty("authentication")
    private Session session;
    @JsonProperty("flashcardboxes")
    private FlashCardBoxRequest flashCardBoxRequest;
}
