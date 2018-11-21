package server.config;

public enum StatusCode {
    OK(200, "OK"),

    REGISTERERROR(400, "REGISTER ERROR"),
    VERIFYERROR(401, "CANNOT VERIFY"),
    TOKENEXPIRED(402, "TOKEN HAS EXPIRED"),

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
