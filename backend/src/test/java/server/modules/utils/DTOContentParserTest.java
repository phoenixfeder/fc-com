package server.modules.utils;

import org.junit.Assert;
import org.junit.Test;
import server.entities.FlashCardBox;
import server.entities.User;
import server.entities.dto.RequestDTO;
import server.entities.dto.request.FlashCardBoxRequest;
import server.entities.dto.request.FlashcardRequest;
import server.entities.dto.request.UserRequest;
import server.entities.dto.response.FlashCardBoxResponse;
import server.exceptions.FccExcpetion;
import server.exceptions.WrongFormatException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class DTOContentParserTest {


    @Test
    public void parseFlashcardBoxEntitiesWhenUserIsOwnerTest() {
        User user = new User();
        user.setId(1L);
        FlashCardBox flashCardBox = new FlashCardBox();
        flashCardBox.setId(1000L);
        flashCardBox.setOwner(user);
        flashCardBox.setCreationDate(LocalDateTime.now());
        flashCardBox.setLastChanged(LocalDateTime.now());
        flashCardBox.setSharedToUsers(new ArrayList<>());
        List<FlashCardBox> flashCardBoxes = new ArrayList<>();
        flashCardBoxes.add(flashCardBox);

        List<FlashCardBoxResponse> responses = DTOContentParser.parseFlashcardBoxEntities(flashCardBoxes, user);
        FlashCardBoxResponse boxResponse = responses.get(0);

        assert(boxResponse.getId() == 1000L);
        assert(boxResponse.isUserOwnsBox());
    }

    @Test
    public void parseFlashcardBoxEntitiesWhenUserIsNotOwnerTest() {
        User owner = new User();
        owner.setId(1L);
        User sharedUser = new User();
        sharedUser.setId(2L);
        FlashCardBox flashCardBox = new FlashCardBox();
        flashCardBox.setId(1000L);
        flashCardBox.setOwner(owner);
        flashCardBox.setCreationDate(LocalDateTime.now());
        flashCardBox.setLastChanged(LocalDateTime.now());
        flashCardBox.setSharedToUsers(new ArrayList<>());
        List<FlashCardBox> flashCardBoxes = new ArrayList<>();
        flashCardBoxes.add(flashCardBox);

        List<FlashCardBoxResponse> responses = DTOContentParser.parseFlashcardBoxEntities(flashCardBoxes, sharedUser);
        FlashCardBoxResponse boxResponse = responses.get(0);

        assert(boxResponse.getId() == 1000L);
        assert(!boxResponse.isUserOwnsBox());
    }

    @Test
    public void getFlashCardBoxTest() throws FccExcpetion {
        FlashCardBoxRequest flashCardBoxRequest = new FlashCardBoxRequest();
        flashCardBoxRequest.setTitle("title");
        flashCardBoxRequest.setDescription("description");
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setFlashCardBoxRequest(flashCardBoxRequest);

        FlashCardBoxRequest expected = DTOContentParser.getFlashCardBox(requestDTO);

        assert(expected == flashCardBoxRequest);
    }

    @Test
    public void getFlashCardBoxShouldThrowExceptionWhenNoTitleTest() throws FccExcpetion {
        FlashCardBoxRequest flashCardBoxRequest = new FlashCardBoxRequest();
        flashCardBoxRequest.setDescription("description");
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setFlashCardBoxRequest(flashCardBoxRequest);

        try {
            FlashCardBoxRequest expected = DTOContentParser.getFlashCardBox(requestDTO);
            Assert.fail("Exception should have been thrown");
        } catch (WrongFormatException ex) {
        }
    }

    @Test
    public void getFlashCardBoxShouldThrowExceptionWhenNoDescriptionTest() throws FccExcpetion {
        FlashCardBoxRequest flashCardBoxRequest = new FlashCardBoxRequest();
        flashCardBoxRequest.setTitle("title");
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setFlashCardBoxRequest(flashCardBoxRequest);

        try {
            FlashCardBoxRequest expected = DTOContentParser.getFlashCardBox(requestDTO);
            Assert.fail("Exception should have been thrown");
        } catch (WrongFormatException ex) {
        }
    }


    @Test
    public void getFlashCardBoxID() throws FccExcpetion {
        FlashCardBoxRequest flashCardBoxRequest = new FlashCardBoxRequest();
        flashCardBoxRequest.setId(1L);
        flashCardBoxRequest.setTitle("title");
        flashCardBoxRequest.setDescription("description");
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setFlashCardBoxRequest(flashCardBoxRequest);

        Long expectedId = DTOContentParser.getFlashCardBoxID(requestDTO);

        assert(expectedId.equals(1L));
    }

    @Test
    public void getFlashcardRequestBoxID() throws FccExcpetion {
        FlashcardRequest flashcardRequest = new FlashcardRequest();
        flashcardRequest.setBoxId(1L);
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setFlashcardRequest(flashcardRequest);

        Long expectedId = DTOContentParser.getFlashcardRequestBoxID(requestDTO);

        assert(expectedId.equals(1L));
    }

    @Test
    public void getOldPassword() throws FccExcpetion {
        UserRequest userRequest = new UserRequest();
        userRequest.setOldPassword("password");
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setUserRequest(userRequest);

        String expected = DTOContentParser.getOldPassword(requestDTO);

        assert(expected.equals("password"));
    }
}
