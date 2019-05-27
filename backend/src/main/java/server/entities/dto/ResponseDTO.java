package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import server.entities.dto.response.*;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    @JsonProperty("status")
    private StatusResponse statusResponse;
    @JsonProperty("register")
    private RegisterResponse registerResponse;

    @JsonProperty("user")
    private UserResponse userResponse;

    @JsonProperty("flashcardboxes")
    private List<FlashCardBoxResponse> flashCardBoxResponses;

    @JsonProperty("flashcards")
    private List<Flashcard> flashcards;

    @JsonProperty("dashboard")
    private DashboardResponse dashboard;

    public ResponseDTO(StatusResponse statusResponse) {
        this.statusResponse = statusResponse;
    }

    public void setFlashCardBoxResponses(FlashCardBoxResponse flashCardBoxResponse) {
        flashCardBoxResponses = new ArrayList<>();
        flashCardBoxResponses.add(flashCardBoxResponse);
    }

    public void setFlashCardBoxResponses(List<FlashCardBoxResponse> flashCardBoxResponses) {
        this.flashCardBoxResponses = flashCardBoxResponses;
    }

    public void setFlashCards(Flashcard flashcard) {
        this.flashcards = new ArrayList<>();
        this.flashcards.add(flashcard);
    }

    public void setFlashCards(List flashCards) {
        this.flashcards = flashCards;
    }
}
