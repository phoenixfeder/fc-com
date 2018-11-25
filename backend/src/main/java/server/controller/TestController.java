package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.Role;
import server.entities.User;
import server.entities.VerificationToken;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.repositories.RoleRepository;
import server.entities.repositories.UserRepository;
import server.entities.repositories.VerificationTokenRepository;

import java.sql.Timestamp;
import java.util.Calendar;

@Controller
@RequestMapping("/t")
public class TestController {

    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public TestController(VerificationTokenRepository verificationTokenRepository, UserRepository userRepository, RoleRepository roleRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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
