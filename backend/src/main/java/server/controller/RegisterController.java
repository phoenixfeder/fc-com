package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.services.RegisterService;

@Controller
@RequestMapping("/register")
public class RegisterController {
    private RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/checkname/{name}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO checkUsername(@PathVariable("name") String name) {
        return registerService.checkUsername(name);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/checkmail/{mail}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO checkMail(@PathVariable("mail") String mail) {
        return registerService.checkMail(mail);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/newuser", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addUser(@RequestBody RequestDTO requestDTO) {

        ResponseDTO responseDTO = registerService.addUser((requestDTO));
        if(responseDTO.getStatusResponse().getMessage().equals("OK")){

        }
        return responseDTO;
    }
}
