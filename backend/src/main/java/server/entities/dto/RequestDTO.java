package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import server.entities.dto.request.*;

import java.util.List;

@Getter
@Setter
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
    @JsonProperty("flashcards")
    private List<Flashcard> flashcardList;
}
