package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String title;
    private String frontText;
    private String backText;

    //@ManyToMany(mappedBy = "cards")
    //Set<FlashCardBox> boxes = new HashSet<>();
}
