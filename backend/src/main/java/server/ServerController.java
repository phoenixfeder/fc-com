package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import server.entities.FlashCard;
import server.exceptions.NoPermissionException;
import server.services.FlashCardService;
import server.system.Authenticator;

@Controller
public class ServerController {

    private FlashCardService flashCardService;

    @Autowired
    public void setFlashCardService(FlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }


    @RequestMapping(
            path = "/flashcard/{id}",
            method = RequestMethod.GET)
    public @ResponseBody
    FlashCard getFlashCardWithID(@PathVariable("id") int id, @RequestParam(value = "auth", required = false) String auth) {
        if (Authenticator.isValidAuthentication(auth)) {
            return flashCardService.getFlashCardwithID(id);
        }
        throw new NoPermissionException();

    }
}
