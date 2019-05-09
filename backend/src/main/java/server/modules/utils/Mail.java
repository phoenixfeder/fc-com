package server.modules.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import server.config.Lang;

@Component
public class Mail {

    private final JavaMailSender mailSender;

    @Autowired
    public Mail(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private String getMailText(String username, String id, String token) {
        String text = Lang.mailText;
        text = text.replace("##username##", username);
        text = text.replace("##userid##", id);
        text = text.replace("##token##", token);
        return text;
    }

    private String getMailTextPassword(String username, String id, String token) {
        String text = Lang.mailTextPassword;
        text = text.replace("##username##", username);
        text = text.replace("##userid##", id);
        text = text.replace("##token##", token);
        return text;
    }

    public void send(String mailAddress, String username, String id, String token) {
        SimpleMailMessage email = new SimpleMailMessage();
        //TODO email.setTo(mailAddress);
        email.setTo("flashcardcommunity@gmail.com");
        email.setSubject("Registration Confirmation");
        String text = getMailText(username, id, token);
        email.setText(text);
        mailSender.send(email);
    }

    public void sendNewPassword(String mailAdress, String username, String id, String token) {
        SimpleMailMessage email = new SimpleMailMessage();
        //TODO email.setTo(mailAddress);
        email.setTo("flashcardcommunity@gmail.com");
        email.setSubject("Resetting your password");
        String text = getMailTextPassword(username, id, token);
        email.setText(text);
        mailSender.send(email);
    }


}
