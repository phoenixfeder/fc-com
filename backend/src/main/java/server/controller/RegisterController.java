package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @RequestMapping(
            path = "/nametaken",
            method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO checkIfUserNameTaken(@RequestBody RequestDTO requestDTO) {
        return registerService.isUsernameTaken(requestDTO.getRegister().getUser().getUserName());
    }
}
