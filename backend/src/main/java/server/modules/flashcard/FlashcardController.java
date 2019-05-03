package server.modules.flashcard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.config.Config;
import server.entities.dto.RequestDTO;
import server.entities.dto.ResponseDTO;
import server.exceptions.FccExcpetion;

@Controller
@RequestMapping("/flashcard")
public class FlashcardController {

    private final FlashcardService flashcardService;

    @Autowired
    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/new", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO addFlashcard(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return flashcardService.addFlashcard(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/edit", method = RequestMethod.PUT)
    public @ResponseBody
    ResponseDTO editFlashCard(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return flashcardService.editFlashcard(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/delete", method = RequestMethod.DELETE)
    public @ResponseBody
    ResponseDTO deleteOneFlashCard(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return flashcardService.deleteFlashcardById(requestDTO);
    }

    @CrossOrigin(origins = Config.ORIGIN_URL)
    @RequestMapping(path = "/get", method = RequestMethod.POST)
    public @ResponseBody
    ResponseDTO getFlashCardsOfFlashCardBox(@RequestBody RequestDTO requestDTO) throws FccExcpetion {
        return flashcardService.getFlashCardsOfFlashCardBox(requestDTO);
    }

}
