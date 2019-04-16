package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.repositories.VerificationTokenRepository;

@Component
public class TokenConnector {

    private final VerificationTokenRepository verificationTokenRepository;

    @Autowired
    public TokenConnector(VerificationTokenRepository verificationTokenRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
    }

    public VerificationToken getTokenByUser(User user) {
        return verificationTokenRepository.findByUser(user);
    }

    public VerificationToken save(VerificationToken token) {
        return verificationTokenRepository.save(token);
    }

    public void delete(VerificationToken token) {
        verificationTokenRepository.delete(token);
    }
}
