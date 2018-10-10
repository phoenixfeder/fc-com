package server;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ServerController {

    @GetMapping(path = "/")
    public @ResponseBody
    void helloWorld() {
        System.out.println("Hello World"); //Navigate to http://localhost:8080/ to get this output in the console
    }
}
