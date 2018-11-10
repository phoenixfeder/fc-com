package server.services.register;

import server.entities.repositories.UserRepository;

public class CheckEntries {
    public static boolean isUserNameTaken(UserRepository userRepository, String name){
        return userRepository.findUserByUsername(name) != null;
    }

    public static boolean isEmailTaken(UserRepository userRepository, String email){
        return userRepository.findUserByEmail(email) != null;
    }
}
