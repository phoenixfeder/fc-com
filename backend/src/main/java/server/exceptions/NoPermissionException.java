package server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "No permission", code = HttpStatus.UNAUTHORIZED)
public class NoPermissionException extends RuntimeException {
}
