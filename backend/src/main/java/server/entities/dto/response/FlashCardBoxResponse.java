package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import server.entities.FlashCardBox;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FlashCardBoxResponse {

    private Long id;
    private String title;
    private String description;
    private String created;
    private String lastchanged;
    private Long flashcards;
    private List<String> sharedToUsers = new ArrayList<>();
    //private Set<Flashcard> flashcards = new HashSet<>();
    private boolean userOwnsBox;

    public FlashCardBoxResponse(long id, String title, String description, LocalDateTime created, LocalDateTime lastchanged, Long flashcards, List<String> users, boolean ownsBox) {
        this.id = id;
        this.title = title;
        this.description = description;
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        this.created = created.format(dateTimeFormatter);
        this.lastchanged = lastchanged.format(dateTimeFormatter);
        this.flashcards = flashcards;
        this.sharedToUsers = users;
        this.userOwnsBox = ownsBox;
    }

    public FlashCardBoxResponse(FlashCardBox flashCardBox, boolean userOwnsBox) {
        this.id = flashCardBox.getId();
        this.title = flashCardBox.getTitle();
        this.description = flashCardBox.getDescription();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        this.created = flashCardBox.getCreationDate().format(dateTimeFormatter);
        this.lastchanged = flashCardBox.getLastChanged().format(dateTimeFormatter);
        this.flashcards = flashCardBox.getFlashcards();
        if (userOwnsBox) {
            this.sharedToUsers = flashCardBox.getSharedUserNames();
        }
        this.userOwnsBox = userOwnsBox;
    }
}
