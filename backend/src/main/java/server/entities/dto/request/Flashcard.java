package server.entities.dto.request;

import lombok.Data;

@Data
public class Flashcard {
    private Long id;
    private boolean correct;
}
