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
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/dashboard", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO getDashboardData(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return dashboardService.getDashBoard((requestDTO));
    }
}
