package server.entities.dto;

import lombok.Getter;
import server.entities.dto.request.Register;
import server.entities.dto.request.Status;

@Getter
public class RequestDTO {
    Status status;
    Register register;

}
