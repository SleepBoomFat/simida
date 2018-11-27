package com.roncoo.eshop.cache.controller;

import com.roncoo.eshop.cache.model.Role;
import com.roncoo.eshop.cache.model.User;
import com.roncoo.eshop.cache.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import redis.clients.jedis.JedisCluster;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private UserService userService;
    @Resource
    private JedisCluster jedisCluster;

    private final static String SESSION_KEY = "SESSION_";

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String login(){
        return "/index";
    }

    //post登录
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(HttpServletRequest request, HttpServletResponse response, HttpSession session, Model model){

        Object user = session.getAttribute("user");
        String username=request.getParameter("useraccount");
        String password=request.getParameter("userpwd");
        //添加用户认证信息
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken( username,password);
        try{
            //进行验证，这里可以捕获异常，然后返回对应信息
            subject.login(usernamePasswordToken);
            User currentUser = userService.findByAccount(username);//当前用户
            session.setAttribute("user",session.getId());
            session.setMaxInactiveInterval(1000*60*60);//登陆保持最多一小时
            Set<Role> roleSet = currentUser.getRoles();//当前用户的角色信息,可能有多个角色
            //这里用比较蠢的方法模拟一下，系统逻辑比较简单，用shiro的鉴权有点麻烦，所以这里只用shiro进行了登陆
            for (Role role:roleSet) {
                if(role.getRname().equals("admin")){
                    return "admin/vipWelcome";
                }
            }
            //这里先不考虑redis session共享问题
            jedisCluster.setex(SESSION_KEY + username,60 * 60,session.getId());
            return "user/welcome";
        }catch (Exception e){
            System.out.println(e.getMessage() + "----------");
            return "index";
        }
    }

    //登出
    @RequestMapping(value = "/logout")
    public String logout(HttpSession session){
            session.removeAttribute("user");
        return "index";
    }


    //注解的使用
    @RequiresRoles("admin")
    @RequiresPermissions("create")
    @RequestMapping(value = "/create")
    public String create(){
        return "Create success!";
    }




}
