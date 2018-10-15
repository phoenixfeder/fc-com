package server.services;

import org.springframework.stereotype.Service;
import server.entities.FlashCard;
import server.entities.FlashCardRepository;
import server.exceptions.NoFlashCardWithIDException;

import javax.persistence.EntityManager;

@Service
public class FlashCardService {
    private final FlashCardRepository flashCardRepository;

    //private final EntityManager entityManager;

    public FlashCardService(FlashCardRepository flashCardRepository/*, EntityManager entityManager*/) {
        this.flashCardRepository = flashCardRepository;
        //this.entityManager = entityManager;
    }

    public FlashCard getFlashCardwithID(int id){
        if(flashCardRepository.existsById(id)){
            return flashCardRepository.findById(id).get();
        }

        throw new NoFlashCardWithIDException();
    }
}
