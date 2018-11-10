package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping(path = "/checkname/{name}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO checkUsername(@PathVariable("name") String name) {
        return registerService.checkUsername(name);
    }

    @RequestMapping(path = "/newuser", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addUser(@RequestBody RequestDTO requestDTO) {
        return registerService.addUser(requestDTO);
    }
}
