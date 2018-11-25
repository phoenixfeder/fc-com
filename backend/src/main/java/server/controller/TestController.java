package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import server.config.Config;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.repositories.UserRepository;
import server.entities.repositories.VerificationTokenRepository;

import java.sql.Timestamp;
import java.util.Calendar;

@Controller
@RequestMapping("/t")
public class TestController {

    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    @Autowired
    public TestController(VerificationTokenRepository verificationTokenRepository, UserRepository userRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.userRepository = userRepository;
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/createtestentries", method = RequestMethod.GET)
    public void
    createTestEntries() {

        User user = userRepository.findById(1L).orElse(new User());
        verificationTokenRepository.save(new VerificationToken(user));

        user = userRepository.findById(2L).orElse(new User());
        VerificationToken token = new VerificationToken(user);
        token.setExpiryDate(new Timestamp(Calendar.getInstance().getTime().getTime()));
        verificationTokenRepository.save(token);


    }

}
