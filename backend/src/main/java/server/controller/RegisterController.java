package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.config.StatusCode;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.StatusResponse;
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
    @RequestMapping(path = "/newuser", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addUser(@RequestBody RequestDTO requestDTO) {
        return registerService.addUser((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyUser(@RequestParam(value = "id",required = false) String id, @RequestParam(value = "token", required = false) String token) {
        return registerService.verifyUser(id, token);
    }
    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/sendnewtoken", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO sendnewtoken(@RequestBody RequestDTO requestDTO) {
        return registerService.sendNewToken(requestDTO);
    }
}
