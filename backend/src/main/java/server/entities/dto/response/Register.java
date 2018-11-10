package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Register {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private boolean userNameIsTaken;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private boolean emailIsTaken;

}
