package server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping(
            path = "/register",
            method = RequestMethod.POST)
    public @ResponseBody
    HttpStatus getFlashCardWithID() {
        return HttpStatus.OK;
    }
}
