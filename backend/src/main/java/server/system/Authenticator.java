package server.system;

public class Authenticator {
    public static boolean isValidAuthentication(String auth){
        return "123abc".equals(auth);
    }
}
