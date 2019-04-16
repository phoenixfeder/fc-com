package server.modules.account;

import org.springframework.stereotype.Component;
import server.entities.User;
import server.entities.VerificationToken;

import java.time.LocalDateTime;

@Component
public class TokenComponent {

    private boolean isTokenMatching(String token, String userToken) {
        return token.equals(userToken);
    }

    public boolean isTokenValid(User user, VerificationToken token, String requestToken) {

        if (user == null || token == null) return false;
        return isTokenMatching(requestToken, token.getToken());

    }

    public boolean hasTokenExpired(VerificationToken verificationToken) {
        return verificationToken.getExpiryDate().isBefore(LocalDateTime.now());
    }
}
