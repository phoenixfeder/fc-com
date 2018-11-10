package server.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import server.entities.dto.response.Register;
import server.entities.dto.response.Status;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
    Status status;
    Register register;
}
