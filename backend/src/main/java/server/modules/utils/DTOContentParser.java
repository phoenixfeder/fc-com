package server.modules.utils;

import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.request.FlashcardRequest;
import server.entities.dto.request.RegisterRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.FlashCardBoxResponse;
import server.exceptions.FccExcpetion;
import server.exceptions.WrongFormatException;

import java.util.ArrayList;
import java.util.List;

public class DTOContentParser {
    public static RegisterRequest getRegisterRequest(RequestDTO requestDTO) throws WrongFormatException {
        try {
            return requestDTO.getRegisterRequest();
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static UserRequest getRegisterUserRequest(RegisterRequest registerRequest) throws WrongFormatException {
        try {
            return registerRequest.getUserRequest();
        } catch (NullPointerException e) {
            throw new WrongFormatException();
        }
    }

    public static UserRequest getUserRequest(RequestDTO requestDTO) throws WrongFormatException {
        UserRequest userRequest = requestDTO.getUserRequest();
        if (userRequest == null) {
            throw new WrongFormatException();
        }
        return userRequest;
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

    public static List<FlashCardBoxResponse> parseFlashcardBoxEntities(List<FlashCardBox> flashCardBoxes, User user) {
        List<FlashCardBoxResponse> flashCardBoxResponses = new ArrayList<>();
        for (FlashCardBox flashcardBox : flashCardBoxes) {
            boolean ownsBox = flashcardBox.getOwner() == user;
            flashCardBoxResponses.add(new FlashCardBoxResponse(flashcardBox, ownsBox));
        }
        return flashCardBoxResponses;
    }

    public static FlashCardBoxRequest getFlashCardBox(RequestDTO requestDTO) throws WrongFormatException {
        FlashCardBoxRequest flashCardBoxRequest = requestDTO.getFlashCardBoxRequest();
        if (flashCardBoxRequest == null || flashCardBoxRequest.getTitle() == null || flashCardBoxRequest.getDescription() == null) {
            throw new WrongFormatException();
        }
        return flashCardBoxRequest;
    }

    public static Long getFlashCardBoxID(RequestDTO requestDTO) throws WrongFormatException {
        FlashCardBoxRequest flashCardBoxRequest = requestDTO.getFlashCardBoxRequest();
        if (flashCardBoxRequest == null) {
            throw new WrongFormatException();
        }
        return flashCardBoxRequest.getId();
    }

    public static Long getFlashcardRequestBoxID(RequestDTO requestDTO) throws WrongFormatException {
        FlashcardRequest flashCardRequest = requestDTO.getFlashcardRequest();
        if (flashCardRequest == null || flashCardRequest.getBoxId() == null) {
            throw new WrongFormatException();
        }
        return flashCardRequest.getBoxId();
    }

    public static FlashcardRequest getFlashCard(RequestDTO requestDTO) throws WrongFormatException {
        FlashcardRequest flashCardRequest = requestDTO.getFlashcardRequest();
        if (flashCardRequest == null || flashCardRequest.getTitle() == null || flashCardRequest.getBack() == null || flashCardRequest.getFront() == null) {
            throw new WrongFormatException();
        }
        return flashCardRequest;
    }

    public static String getOldPassword(RequestDTO requestDTO) throws WrongFormatException {
        try {
            return requestDTO.getUserRequest().getOldPassword();
        } catch (Exception e) {
            throw new WrongFormatException();
        }
    }

    public static Long parseVerifyId(String requestId, String requestToken) throws FccExcpetion {
        if (requestId == null || requestToken == null) {
            throw new WrongFormatException();
        }
        long id;
        try {
            id = Long.parseLong(requestId);
        } catch (NumberFormatException e) {
            e.printStackTrace();
            throw new WrongFormatException();
        }
        return id;
    }
}
