package com.roncoo.eshop.cache.controller;

import com.roncoo.eshop.cache.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.LinkedList;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {
    @RequestMapping("/list")
    public String check(HttpServletRequest request, HttpSession session, Model model){
        List<User> list = new LinkedList<>();
        for (int i = 0 ;i <10;i++) {
            User u = new User();
            u.setUid(i);
            u.setUserName("user-"+ i);
            u.setUserAccount("acc-" + i);
            u.setPassword("123");
            list.add(u);
        }
        model.addAttribute("hello","Hello, Spring Boot!");
        model.addAttribute("userList",list);
        return "/user/list";
    }
}
