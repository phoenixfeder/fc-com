package server.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class FlashCardStatistics implements Serializable {

    @EmbeddedId
    private FlashCardStatisticsPK flashCardUser;

    @Column
    private Long trials;

    @Column
    private Long failedTrials;

    @Column
    private char deck;

    public FlashCardStatistics() {
        super();
        this.deck = 'A';
        this.trials = 0L;
        this.failedTrials = 0L;
    }

    public FlashCardStatistics(FlashCard flashCard, User user) {
        this();
        this.flashCardUser = new FlashCardStatisticsPK(flashCard, user);
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FlashCardStatisticsPK implements Serializable {
        @OneToOne
        @JoinColumn(nullable = false, name = "flashcard_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        private FlashCard flashCard;

        @OneToOne
        @JoinColumn(nullable = false, name = "user_id")
        @OnDelete(action = OnDeleteAction.CASCADE)
        private User user;
    }
}
