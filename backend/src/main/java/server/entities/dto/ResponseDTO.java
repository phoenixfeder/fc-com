package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import server.entities.dto.response.Box;
import server.entities.dto.response.RegisterResponse;
import server.entities.dto.response.StatusResponse;
import server.entities.dto.response.UserResponse;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    @JsonProperty("status")
    private StatusResponse statusResponse;
    @JsonProperty("register")
    private RegisterResponse registerResponse;

    @JsonProperty("user")
    private UserResponse userResponse;

    @JsonProperty("flashcardboxes")
    private List<Box> boxes;

    public ResponseDTO(StatusResponse statusResponse) {
        this.statusResponse = statusResponse;
    }

    public void setBoxes(Box box) {
        boxes = new ArrayList<>();
        boxes.add(box);
    }

    public void setBoxes(List<Box> box) {
        boxes = box;
    }
}
