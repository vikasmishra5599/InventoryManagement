package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.dto.AuthUserResponse;
import com.poc.InventoryManagement.entity.AuthUser;
import com.poc.InventoryManagement.entity.Role;
import com.poc.InventoryManagement.entity.User;
import com.poc.InventoryManagement.exception.BadRequestException;
import com.poc.InventoryManagement.exception.InvalidInputException;
import com.poc.InventoryManagement.repositories.AuthUserRepository;
import com.poc.InventoryManagement.repositories.RoleRepository;
import com.poc.InventoryManagement.repositories.UserRepository;
import com.poc.InventoryManagement.request.AddUserRequest;
import com.poc.InventoryManagement.request.UserRequest;
import com.poc.InventoryManagement.utils.Generators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private UserRepository userRepository;

    private AuthUserRepository authUserRepository;

    private EmailService emailService;

    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, AuthUserRepository authUserRepository, EmailService emailService,RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.authUserRepository = authUserRepository;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    public User createUser(UserRequest userRequest) {
        User user = mapRequestToEntity(userRequest);
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    private User mapRequestToEntity(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmpId(request.getEmpId());
        user.setEmailId(request.getEmailId());
        user.setTeamName(request.getTeamName());
        user.setContactNo(request.getContactNo());
        user.setSupervisorName(request.getSupervisorName());
        user.setManager(request.getManager());
        user.setCreatedTime(ZonedDateTime.now());
        return user;
    }

    @Transactional
    public AuthUser addNewUser(AddUserRequest addUserRequest) throws NoSuchAlgorithmException, InvalidInputException {

        if(!checkEmailExists(addUserRequest.email()))
            throw new BadRequestException("User Already Exists!");
        AuthUser authUser = new AuthUser();
        authUser.setActive(true);
        authUser.setEmail(addUserRequest.email());
        authUser.setFirstName(addUserRequest.firstName());
        authUser.setLastName(addUserRequest.lastName());
        authUser.setIncorrectAttempts(0);
        authUser.setPhoneNo(addUserRequest.phoneNumber());
        String regKey = Generators.generateNewUserKey(addUserRequest.email());
        authUser.setRegKey(regKey);
        authUser.setRegLinkActive(true);
        authUser.setRegLinkExpiry(LocalDateTime.now().plusDays(3));
        Set<Role> roles = new HashSet<>();
        roles.add(getUserRole());
        if (addUserRequest.isManager() ) {roles.add(getMangerRole());}
        authUser.setRoles(roles);
        AuthUser user =authUserRepository.save(authUser);
        emailService.sendRegEmail(addUserRequest.email(), addUserRequest.firstName(), regKey);
        return user;
    }

    public List<AuthUserResponse> getAllAuthUsers(){
        List<AuthUser> userList = authUserRepository.findAll();
        return userList.stream().map(this::authUserMapper).collect(Collectors.toList());
    }

    private AuthUserResponse authUserMapper(AuthUser authUser){
        return new AuthUserResponse(authUser.getId(),authUser.getEmail(),authUser.getFirstName(),authUser.getLastName(), authUser.isActive(), authUser.getRoles().stream().map(n->n.getName()).toList());
    }

    private boolean checkEmailExists(String email){
       return authUserRepository.getAuthUserByEmailId(email).isEmpty();
    }

    private Role getMangerRole(){
        Role managerRole = roleRepository.getRolebyName("ROLE_MANAGER").get();
        return managerRole;
    }

    private Role getUserRole(){
        Role userRole = roleRepository.getRolebyName("ROLE_USER").get();
        return userRole;
    }

    public AuthUserResponse getAuthUserByEmail(String email){
        return authUserMapper(authUserRepository.getAuthUserByEmailId(email).get());
    }
}
