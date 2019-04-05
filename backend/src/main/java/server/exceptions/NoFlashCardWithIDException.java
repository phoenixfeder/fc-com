package server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Deprecated
@ResponseStatus(reason = "No Flashcard with that ID.", code = HttpStatus.NOT_FOUND)
public class NoFlashCardWithIDException extends RuntimeException {
}
