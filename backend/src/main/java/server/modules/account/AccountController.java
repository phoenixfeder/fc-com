package server.modules.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;
import server.modules.utils.DTOContentParser;

@Controller
@RequestMapping("/account")
public class AccountController {

    private final AccountService accountService;
    private final AccountServicePasswordReset accountServicePasswordReset;

    @Autowired
    public AccountController(AccountService accountService, AccountServicePasswordReset accountServicePasswordReset) {
        this.accountService = accountService;
        this.accountServicePasswordReset = accountServicePasswordReset;
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
    ResponseDTO verifyUser(@RequestParam(value = "id", required = false) String id, @RequestParam(value = "token", required = false) String token) throws FccExcpetion{
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
        return accountServicePasswordReset.resetPassword(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "resetpassword/verify", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO verifyResetPassword(@RequestBody RequestDTO requestDTO, @RequestParam(value = "id", required = false) String id, @RequestParam(value = "token", required = false) String token) throws FccExcpetion {
        String password = accountServicePasswordReset.parsePassword(requestDTO);
        accountServicePasswordReset.checkPassword(password);
        Long requestId = DTOContentParser.parseVerifyId(id, token);
        return accountServicePasswordReset.verifyResetPassword(requestId, token, password);
    }
}
