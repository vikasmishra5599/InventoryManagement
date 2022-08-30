package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.entity.User;
import com.poc.InventoryManagement.repositories.UserRepository;
import com.poc.InventoryManagement.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
