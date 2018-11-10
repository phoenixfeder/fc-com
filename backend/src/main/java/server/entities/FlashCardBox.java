package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class FlashCardBox {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String title;


    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "FlashCardsInFlashCardBox",
            joinColumns = {@JoinColumn(name = "flash_card_box_id")},
            inverseJoinColumns = {@JoinColumn(name = "flash_card_id")}
    )
    private Set<FlashCard> cards = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "FlashCardBoxOwnedByUser",
            joinColumns = {@JoinColumn(name = "flash_card_box_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    private Set<FlashCard> boxUsers = new HashSet<>();

}
