package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Box {

    public Box(long id, String title, String description, LocalDateTime created, LocalDateTime lastchanged) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created = created;
        this.lastchanged = lastchanged;
    }

    private long id;
    private String title;
    private String description;
    private LocalDateTime created;
    private LocalDateTime lastchanged;
    //TODO FLASHCARDS ZÄHLEN
    private int flashcards = 0;
    //private Set<Flashcard> flashcards = new HashSet<>();
}
