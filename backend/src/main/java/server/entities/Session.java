package server.entities;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class Session {

    private static final int EXPIRATION = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(unique = true, nullable = false)
    private String session;

    @OneToOne
    @JoinColumn(nullable = false, name = "user_id")
    User user;

    private LocalDateTime expiryDate;

    public Session() {
        super();
    }

    public Session(String session, User user) {
        this.session = session;
        this.user = user;
        this.expiryDate = createExpireDate();
    }

    private LocalDateTime createExpireDate() {
        return LocalDateTime.now().plusMinutes(EXPIRATION);
    }

    public void updateExpireDate() {
        this.expiryDate = createExpireDate();
    }
}
