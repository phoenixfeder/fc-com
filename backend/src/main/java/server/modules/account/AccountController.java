package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;

@Controller
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/new", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addUser(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.newAccount((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyUser(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "token", required = false) String token) {
        return accountService.verifyAccount(id, token);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/resettoken", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO sendnewtoken(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.sendNewToken(requestDTO);
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/get", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO getAccountData(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.getAccount((requestDTO));
    }


    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/update", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO setAccountData(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.editAccount(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/close", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO closeAccount(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.closeAccount(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/resetpassword", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO resetPassword(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.resetPassword(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/resetpassword/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyResetPassword(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return accountService.verifyResetPassword(requestDTO);
    }
}
