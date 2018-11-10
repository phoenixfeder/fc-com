package server.entities.dto.parts;

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

    public static Status notOk(String message){
        return new Status(message);
    }
}
