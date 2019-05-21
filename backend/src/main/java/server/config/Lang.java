package server.config;

public class Lang {
    public final static String UsernameTooShort = "Username must be at least 3 characters and maximal 12 characters.";
    public final static String UsernameIsTaken = "Username already exists.";
    public final static String UsernameSymbols = "Username can only consists of" +
            " alphanumeric characters (A-z 0-9)," +
            " underscore (_) and dash (-), but not two in a row.";
    public final static String EmailIsTaken = "Email is already in use.";
    public final static String EmailFormat = "This is not an email address.";
    public final static String PasswordTooShort = "Password must be at least 6 characters and maximal 32 characters.";


    public final static String mailText =
            "Hello ##username##,\n\n" +
                    "Welcome to Flashcard Community. " +
                    "To verify your Account please use the following Link: " +
                    Config.MAILORIGIN + "?id=##userid##&token=##token##\n\n" +
                    "Happy learning!";

    public static final String PasswordIncorrect = "Password is incorrect.";
    public final static String mailTextPassword =
            "Hello ##username##, \n\n" +
                    "You recently requested to reset your password for your Flashcard Community Account. " +
                    "Follow the link to enter a new Password: " +
                    Config.RESETPASSWORDORIGINS + "?id=##userid##&token=##token##\n\n" +
                    "Happy learning!";
}
