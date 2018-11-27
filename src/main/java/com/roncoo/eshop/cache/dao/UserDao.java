package com.roncoo.eshop.cache.dao;

import com.roncoo.eshop.cache.model.User;

import java.util.List;

public interface UserDao {
    User findByAccount(String account);

    List<User> find();
}
