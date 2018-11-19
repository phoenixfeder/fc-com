package server.entities.repositories;

import org.springframework.data.repository.CrudRepository;
import server.entities.User;
import server.entities.VerificationToken;

public interface VerificationTokenRepository extends CrudRepository<VerificationToken, Long> {
    public VerificationToken findByUser(User user);

    public VerificationToken findByToken(String token);
}
