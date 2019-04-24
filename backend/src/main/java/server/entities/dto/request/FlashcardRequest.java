package server.entities.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FlashcardRequest {
    private long id;
    private String title;
    private String frontSide;
    private String backSide;

    @JsonProperty("flashcardbox")
    private FlashCardBoxRequest flashCardBoxRequest;
}
