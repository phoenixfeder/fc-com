package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.config.StatusCode;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.entities.dto.response.StatusResponse;
import server.services.EditProfileService;

@Controller
@RequestMapping("/edit")
public class EditProfileController {

    private final EditProfileService editProfileService;

    @Autowired
    public EditProfileController(EditProfileService editProfileService) {
        this.editProfileService = editProfileService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/getaccount", method = RequestMethod.POST)
    public @ResponseBody ResponseDTO getAccountData(@RequestBody RequestDTO requestDTO) {
        return editProfileService.getAccountData((requestDTO));
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/updateaccount", method = RequestMethod.PUT)
    public @ResponseBody ResponseDTO setAccountData(@RequestBody RequestDTO requestDTO) {
        return editProfileService.setAccountData((requestDTO));
    }

}
