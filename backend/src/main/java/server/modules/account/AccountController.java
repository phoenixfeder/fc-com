package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;

@Controller
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/new", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addUser(@RequestBody RequestDTO requestDTO) throws Exception{
        return accountService.newAccount((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyUser(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "token", required = false) String token) {
        return accountService.verifyAccount(id, token);
    }

    /*@CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/resettoken", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO sendnewtoken(@RequestBody RequestDTO requestDTO) {
        return registerService.sendNewToken(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/get", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO getAccountData(@RequestBody RequestDTO requestDTO) {
        return editProfileService.getAccountData((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/update", method = RequestMethod.PUT)
    public @ResponseBody ResponseDTO setAccountData(@RequestBody RequestDTO requestDTO) {
        return editProfileService.setAccountData((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/close", method = RequestMethod.PUT)
    public @ResponseBody ResponseDTO closeAccount(@RequestBody RequestDTO requestDTO) {
        return editProfileService.closeAccount((requestDTO));
    }*/

}
