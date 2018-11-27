package com.roncoo.eshop.cache.service;

import com.roncoo.eshop.cache.model.User;

import java.util.List;

public interface UserService {
    User findByAccount(String account);
    List<User> find();
}
