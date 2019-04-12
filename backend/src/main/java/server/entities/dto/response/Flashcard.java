package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Flashcard {
    private String title;
    private String front;
    private String back;
}
