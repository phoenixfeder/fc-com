package server.modules.learning;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;

@Controller
@RequestMapping("/learning")
public class LearningController {
    private final LearningService learningService;

    @Autowired
    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/answer", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO editFlashCard(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return learningService.learned(requestDTO);
    }

}
