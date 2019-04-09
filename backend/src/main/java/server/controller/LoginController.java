package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.config.StatusCode;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.StatusResponse;
import server.exceptions.WrongFormatException;
import server.services.LoginService;

@Deprecated
@Controller
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO loginUser(@RequestBody RequestDTO requestDTO) throws WrongFormatException {
        return loginService.validateLogin(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO logoutUser(@RequestBody RequestDTO requestDTO) {
        return loginService.logout(requestDTO);
    }

}
