package server.services;

import org.springframework.stereotype.Service;
import server.entities.dto.FlashCardDTO;
import server.entities.entitieToDTOTransfer.FlashCardToDTO;
import server.entities.repositories.FlashCardRepository;
import server.exceptions.NoFlashCardWithIDException;

@Deprecated
@Service
public class FlashCardService {
    private final FlashCardRepository flashCardRepository;

    public FlashCardService(FlashCardRepository flashCardRepository) {
        this.flashCardRepository = flashCardRepository;
    }

    public FlashCardDTO getFlashCardWithID(String id_s) {
        try {
            long id = Integer.parseInt(id_s);
            if (flashCardRepository.findById(id).isPresent()) {
                return FlashCardToDTO.transfer(flashCardRepository.findById(id).get());
            }
        } catch (NumberFormatException e) {
            throw new NoFlashCardWithIDException();
        }


        throw new NoFlashCardWithIDException();

    }
}
