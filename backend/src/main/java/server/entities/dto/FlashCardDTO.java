package server.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlashCardDTO {
    private long db_id;
    private String title;
    private String frontText;
    private String backText;
}
