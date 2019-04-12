package server.modules.utils;

import server.entities.FlashCardBox;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.Box;
import server.exceptions.WrongFormatException;

import java.util.ArrayList;
import java.util.List;

public class DTOContentParser {
    public static RegisterRequest getRegisterRequest(RequestDTO requestDTO) throws WrongFormatException {
        try {
            RegisterRequest registerRequest = requestDTO.getRegisterRequest();
            return registerRequest;
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static UserRequest getRegisterUserRequest(RegisterRequest registerRequest) throws WrongFormatException {
        try {
            UserRequest userRequest = registerRequest.getUserRequest();
            return userRequest;
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static UserRequest getUserRequest (RequestDTO requestDTO) throws WrongFormatException {
        try {
            UserRequest userRequest = requestDTO.getUserRequest();
            if(userRequest.getUsername() == null || userRequest.getPassword() == null){
                throw new NullPointerException();
            }
            return userRequest;
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static String getMail(RequestDTO requestDTO) throws WrongFormatException {
        try {
            String mail = getRegisterUserRequest(getRegisterRequest(requestDTO)).getEmail();
            if (mail == null) {
                throw new WrongFormatException();
            }
            return mail;
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static List<Box> parseFlashcardBoxEntities(List<FlashCardBox> flashCardBoxes) {
        List<Box> boxes = new ArrayList<>();
        for (FlashCardBox flashcardBox : flashCardBoxes
        ) {
            boxes.add(new Box(flashcardBox.getId(), flashcardBox.getTitle(), flashcardBox.getDescription(), flashcardBox.getCreationDate(), flashcardBox.getLastChanged()));
        }
        return boxes;
    }

    public static FlashCardBoxRequest getFlashCardBox(RequestDTO requestDTO) throws WrongFormatException {
        FlashCardBoxRequest flashCardBoxRequest = requestDTO.getFlashCardBoxRequest();
        if(flashCardBoxRequest == null || flashCardBoxRequest.getTitle() == null || flashCardBoxRequest.getDescription() == null){
            throw new WrongFormatException();
        }
        return flashCardBoxRequest;
    }

    public static Long getFlashCardBoxID(RequestDTO requestDTO) throws WrongFormatException {
        if(requestDTO.getFlashCardBoxRequest() == null){
            throw new WrongFormatException();
        }
        return requestDTO.getFlashCardBoxRequest().getId();
    }
}
