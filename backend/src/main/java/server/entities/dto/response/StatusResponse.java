package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import server.config.StatusCode;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatusResponse {
    private int code;
    private String message;

    private Session session;


    public StatusResponse(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static StatusResponse create(StatusCode statusCode) {
        return new StatusResponse(statusCode.value(), statusCode.getReasonPhrase());
    }
}
