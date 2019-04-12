package server.entities.dto.request;

import lombok.Data;

@Data
public class FlashCardBoxRequest {
    private String title;
    private String description;
}
