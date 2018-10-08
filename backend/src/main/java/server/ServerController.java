package server;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {

    @RequestMapping("/")
    public String index(){
        return "Greetingsfrom Spring Boot!";
    }
}
