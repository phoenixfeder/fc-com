package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatusResponse {
    String message;

    private StatusResponse(String message) {
        this.message = message;
    }

    public static StatusResponse ok() {
        return new StatusResponse("OK");
    }

    public static StatusResponse notOk() {
        return new StatusResponse("ERROR");
    }

    public static StatusResponse formatError() {
        return new StatusResponse("JSON FORMAT ERROR");
    }
}
