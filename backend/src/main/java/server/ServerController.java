package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import server.entities.FlashCard;
import server.exceptions.NoFlashCardWithIDException;
import server.services.FlashCardService;

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
    FlashCard getFlashCardWithID(@PathVariable("id") String id_s) {
        try{
            int id = Integer.parseInt(id_s);
            return flashCardService.getFlashCardwithID(id);
        }catch (NumberFormatException e){
            throw new NoFlashCardWithIDException();
        }
    }
}
