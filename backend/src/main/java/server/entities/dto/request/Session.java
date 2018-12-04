package server.entities.dto.request;

import lombok.Data;

@Data
public class Session {
    private String session;
    private String hash;
}
