package server.entities.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FlashcardRequest {
    private Long id;
    private String title;
    private String frontSide;
    private String backSide;
    private Long boxId;
}
