package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.dto.AuthUserResponse;
import com.poc.InventoryManagement.entity.AuthUser;
import com.poc.InventoryManagement.entity.Role;
import com.poc.InventoryManagement.exception.BadRequestException;
import com.poc.InventoryManagement.exception.InvalidInputException;
import com.poc.InventoryManagement.repositories.AuthUserRepository;
import com.poc.InventoryManagement.repositories.RoleRepository;
import com.poc.InventoryManagement.request.AddUserRequest;
import com.poc.InventoryManagement.utils.Generators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private AuthUserRepository authUserRepository;

    private EmailService emailService;

    private RoleRepository roleRepository;

    @Autowired
    public UserService(AuthUserRepository authUserRepository, EmailService emailService,RoleRepository roleRepository) {
        this.authUserRepository = authUserRepository;
        this.emailService = emailService;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public AuthUserResponse addNewUser(AddUserRequest addUserRequest) throws NoSuchAlgorithmException, InvalidInputException {

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
        return authUserMapper(user);
    }


    public AuthUserResponse updateUser(AddUserRequest addUserRequest)  {

        AuthUser authUser = authUserRepository.getAuthUserByEmailId(addUserRequest.email()).orElseThrow();
        if(getAuthUserDetails().email().equals(addUserRequest.email())) {
            throw new BadRequestException("Self update Not allowed!");
        }
        //Email change requires invite resend so this will be disabled in UI also
        // authUser.setEmail(addUserRequest.email());
        authUser.setFirstName(addUserRequest.firstName());
        authUser.setLastName(addUserRequest.lastName());
        authUser.setIncorrectAttempts(0);
        authUser.setPhoneNo(addUserRequest.phoneNumber());
        authUser.setRegKey(null);
        authUser.setRegLinkActive(false);
        authUser.setRegLinkExpiry(null);
        Set<Role> roles =  authUser.getRoles();
        roles.clear();
        roles.add(getUserRole());
        if (addUserRequest.isManager() ) {roles.add(getMangerRole());}
        authUser.setRoles(roles);
        AuthUser user =authUserRepository.save(authUser);
        return authUserMapper(user);
    }

    public List<AuthUserResponse> getAllAuthUsers(){
        List<AuthUser> userList = authUserRepository.findAll();
        return userList.stream().map(this::authUserMapper).collect(Collectors.toList());
    }

    private AuthUserResponse authUserMapper(AuthUser authUser) {
        return new AuthUserResponse(authUser.getId(), authUser.getEmail(), authUser.getFirstName(), authUser.getLastName(),
                authUser.isActive(), authUser.getRoles().stream().map(Role::getName).toList(), authUser.getPhoneNo());
    }

    private boolean checkEmailExists(String email){
       return authUserRepository.getAuthUserByEmailId(email).isEmpty();
    }

    private Role getMangerRole(){
        return roleRepository.getRolebyName("ROLE_MANAGER").get();
    }

    private Role getUserRole(){
        return roleRepository.getRolebyName("ROLE_USER").get();
    }

    public AuthUserResponse getAuthUserByEmail(String email){
        return authUserMapper(authUserRepository.getAuthUserByEmailId(email).get());
    }

    public AuthUserResponse getAuthUserDetails(){
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        return getAuthUserByEmail(name);
    }
}
