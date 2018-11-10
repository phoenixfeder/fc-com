package server.entities.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Status {
    String message;

    private Status(String message) {
        this.message = message;
    }

    public static Status ok(){
        return new Status("OK");
    }

    public static Status notOk(){
        return new Status("ERROR");
    }
}
