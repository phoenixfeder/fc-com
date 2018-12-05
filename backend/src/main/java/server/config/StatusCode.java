package server.config;

public enum StatusCode {
    OK(200, "OK"),

    REGISTERERROR(400, "REGISTER ERROR"),
    VERIFYERROR(401, "CANNOT VERIFY"),
    TOKENEXPIRED(402, "TOKEN HAS EXPIRED"),
    EMAILNOTINUSE(403, "EMAIL NOT IN USE"),
    WRONGUNORPW(404, "WRONG USERNAME OR PASSWORD"),
    USERNOTENABLED(405, "USER IS NOT VERIFIED"),
    TOKENNOTEXPIREDYET(406, "VERIFICATION TOKEN NOT EXPIRED YET"),
    PERMISSIONDENIED(407, "PERMISSION DENIED"),
    DATANOTFOUND(408, "REQUESTED DATA NOT FOUND"),
    EDITPROFILEERROR(409, "EDIT PROFILE ERROR"),

    FORMATERROR(500, "OBJECT FORMAT ERROR"),
    PATHERROR(501, "MISSING REQUEST PARAMETERS"),
    EMAILSENDERROR(502, "SENDING VERIFICATION MAIL ERROR");

    private int value;
    private String reasonPhrase;

    StatusCode(int value, String reasonPhrase) {
        this.value = value;
        this.reasonPhrase = reasonPhrase;
    }

    public int value() {
        return value;
    }

    public String getReasonPhrase() {
        return reasonPhrase;
    }
}
