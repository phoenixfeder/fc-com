package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import server.entities.dto.request.*;

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
    @JsonProperty("flashcard")
    private FlashcardRequest flashcardRequest;
}
