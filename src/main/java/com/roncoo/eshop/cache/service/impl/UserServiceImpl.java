package com.roncoo.eshop.cache.service.impl;

import com.roncoo.eshop.cache.dao.UserDao;
import com.roncoo.eshop.cache.model.User;
import com.roncoo.eshop.cache.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public User findByAccount(String account) {
        return userDao.findByAccount(account);
    }

    @Override
    public List<User> find() {
        return userDao.find();
    }
}
