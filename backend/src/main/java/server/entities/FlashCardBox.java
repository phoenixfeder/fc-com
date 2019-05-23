package server.entities;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import server.modules.dbconnector.FlashcardConnector;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class FlashCardBox {

    @TableGenerator(name = "boxGen", table = "ID_GEN", pkColumnName = "GEN_KEY", valueColumnName = "GEN_VALUE", pkColumnValue = "BOX_ID", initialValue = 1000, allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "boxGen")
    private long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @Column(nullable = false)
    private LocalDateTime lastChanged;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "owner")
    private User owner;

    @ManyToMany(mappedBy = "viewableBoxes", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<User> sharedToUsers;

    @Transient
    private Long flashcards;

    public FlashCardBox() {
        super();
    }

    public FlashCardBox(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public void setFlashcards(FlashcardConnector flashcardConnector) {
        this.flashcards = flashcardConnector.countFlashcards(this);
    }

    public List<String> getSharedUserNames() {
        List<String> sharedUserNames = new ArrayList<>();
        sharedToUsers.forEach(sharedUser -> sharedUserNames.add(sharedUser.getUsername()));
        return sharedUserNames;
    }
}
