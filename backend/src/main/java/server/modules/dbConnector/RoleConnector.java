package server.modules.dbConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import server.entities.Role;
import server.entities.repositories.RoleRepository;

@Component
public class RoleConnector {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleConnector(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findById(int id) {
        return roleRepository.findById(id).orElse(null);
    }
}
