package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Box {

    public Box(long id, String title, String description, LocalDateTime created, LocalDateTime lastchanged) {
        this.id = id;
        this.title = title;
        this.description = description;
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.ddTHH:mm:ss");
        this.created = created.format(dateTimeFormatter);
        this.lastchanged = lastchanged.format(dateTimeFormatter);
    }

    private long id;
    private String title;
    private String description;
    private String created;
    private String lastchanged;
    //TODO FLASHCARDS ZÄHLEN
    private int flashcards = 0;
    //private Set<Flashcard> flashcards = new HashSet<>();
}
