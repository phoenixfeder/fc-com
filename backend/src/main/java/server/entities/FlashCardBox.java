package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class FlashCardBox {

    public FlashCardBox(){
        super();
    }

    public FlashCardBox(String title, String description) {
        this.title = title;
        this.description = description;
    }

    @TableGenerator(name = "boxGen", table = "ID_GEN", pkColumnName = "GEN_KEY", valueColumnName = "GEN_VALUE", pkColumnValue = "BOX_ID", initialValue = 1000, allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "boxGen")
    private long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    LocalDateTime creationDate;

    @Column(nullable = false)
    LocalDateTime lastChanged;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "owner")
    private User owner;

}
