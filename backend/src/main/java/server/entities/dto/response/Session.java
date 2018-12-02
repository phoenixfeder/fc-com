package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Session {
    private String session;
    private String hash;
    private String username;
    private long id;
}
