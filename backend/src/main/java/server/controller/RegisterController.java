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
        return registerService.addUser((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyUser(@RequestParam(value = "id",required = false) String id, @RequestParam(value = "token", required = false) String token) {
        return registerService.verifyUser(id, token);
    }
    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/sendVerification/{mail}", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO sendNewVerification(@PathVariable("mail") String mail) {
        return new ResponseDTO(StatusResponse.create(StatusCode.OK));
    }
}
