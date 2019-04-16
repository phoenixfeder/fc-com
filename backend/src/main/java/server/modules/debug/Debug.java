package server.modules.debug;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import server.config.Config;
import server.entities.dto.ResponseDTO;
import server.modules.utils.StatusDTO;

@Controller
@RequestMapping("/debug")
public class Debug {

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/", method = RequestMethod.GET)
    public @ResponseBody
    ResponseDTO addUser() {
        return StatusDTO.ok();
    }
}
