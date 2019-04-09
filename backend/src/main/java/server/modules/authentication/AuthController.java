package server.modules.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;

@Controller
@RequestMapping("/authentication")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO loginUser(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return authService.login(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/logout", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO logoutUser(@RequestBody RequestDTO requestDTO) throws FccExcpetion{
        return authService.logout(requestDTO);
    }
}
