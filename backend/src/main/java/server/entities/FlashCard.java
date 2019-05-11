package server.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
public class FlashCard {

    @TableGenerator(name = "flashcardGen", table = "ID_GEN", pkColumnName = "GEN_KEY", valueColumnName = "GEN_VALUE", pkColumnValue = "FLASHCARD_ID", initialValue = 1000, allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "flashcardGen")
    private long id;

    @Column(nullable=false)
    private String title;
    @Column(nullable=false)
    private String frontText;
    @Column(nullable=false)
    private String backText;

    @OneToOne(targetEntity = FlashCardBox.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "flashcardbox")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FlashCardBox flashcardBox;

    public FlashCard() {
        super();
    }

    public FlashCard(String title, String frontText, String backText) {
        this.title = title;
        this.frontText = frontText;
        this.backText = backText;
    }
}
