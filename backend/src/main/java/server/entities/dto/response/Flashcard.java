package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Flashcard {
    private long id;
    private String title;
    private String front;
    private String back;
    private char deck;
}
