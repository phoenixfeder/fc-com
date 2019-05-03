package server.entities.dto.request;

import lombok.Data;

@Data
public class FlashcardRequest {
    private Long id;
    private String title;
    private String front;
    private String back;
    private Long boxId;
}
