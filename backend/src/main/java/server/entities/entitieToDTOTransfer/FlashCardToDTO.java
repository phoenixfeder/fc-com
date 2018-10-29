package server.entities.entitieToDTOTransfer;

import server.entities.dto.FlashCardDTO;
import server.entities.FlashCard;

public class FlashCardToDTO {
    public static FlashCardDTO transfer(FlashCard flashCard){
        FlashCardDTO flashCardDTO = new FlashCardDTO();

        flashCardDTO.setDb_id(flashCard.getId());
        flashCardDTO.setTitle(flashCard.getTitle());
        flashCardDTO.setFrontText(flashCard.getFrontText());
        flashCardDTO.setBackText(flashCard.getBackText());

        return flashCardDTO;
    }
}
