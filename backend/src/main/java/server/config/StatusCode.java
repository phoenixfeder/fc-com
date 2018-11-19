package server.config;

public enum StatusCode {
    OK(200, "OK"),
    REGISTERERROR(400, "REGISTER ERROR"),
    FORMATERROR(500, "OBJECT FORMAT ERROR");


    private int value;
    private String reasonPhrase;

    StatusCode(int value, String reasonPhrase) {
        this.value = value;
        this.reasonPhrase = reasonPhrase;
    }

    public int value(){
        return value;
    }

    public String getReasonPhrase(){
        return reasonPhrase;
    }
}
