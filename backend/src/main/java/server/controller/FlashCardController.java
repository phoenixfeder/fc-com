package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.FlashCardDTO;
import server.services.FlashCardService;

@Deprecated
@Controller
@RequestMapping("/flashcard")
public class FlashCardController {

    private FlashCardService flashCardService;

    @Autowired
    public void setFlashCardService(FlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(
            path = "/{id}",
            method = RequestMethod.GET)
    public @ResponseBody
    FlashCardDTO getFlashCardWithID(@PathVariable("id") String id_s) {
        return flashCardService.getFlashCardWithID(id_s);
    }
}
