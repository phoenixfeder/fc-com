package server.modules.mailsender;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public abstract class MailSender {

    protected String subject;
    protected String mailBody;
    private final JavaMailSender mailSender;

    protected MailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void send(String mailTo, String username, String id, String token) {
        SimpleMailMessage email = new SimpleMailMessage();
        //TODO email.setTo(mailTo);
        email.setTo("flashcardcommunity@gmail.com");
        email.setSubject(subject);
        String text = personalize(username, id, token);
        email.setText(text);
        mailSender.send(email);
    }

    private String personalize(String username, String id, String token) {
        String text = this.mailBody;
        text = text.replace("##username##", username);
        text = text.replace("##userid##", id);
        text = text.replace("##token##", token);
        return text;
    }
}
