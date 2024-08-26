package com.etour.main.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.etour.main.Dao.CustomerMasterRepository;


@Repository
public class JwtRepository {

    @Autowired
    private CustomerMasterRepository customerMasterRepository;

    public boolean findUser(MyUser myUser) {
        System.out.println("Inside findUser method");
        String uname = myUser.getUsername();
        String pwd = myUser.getPassword();
        return customerMasterRepository.findByUserNameAndPassWord(uname, pwd).isPresent();
    }
}
