package com.roncoo.eshop.cache.common;

import com.roncoo.eshop.cache.model.Module;
import com.roncoo.eshop.cache.model.Role;
import com.roncoo.eshop.cache.model.User;
import com.roncoo.eshop.cache.service.UserService;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

public class AuthRealm extends AuthorizingRealm {
    @Autowired
    private UserService userService;
    //认证.登录
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        System.out.println("--------------------------------login");
        UsernamePasswordToken utoken=(UsernamePasswordToken) token;//获取用户输入的token
        String account = utoken.getUsername();
        String pass = new String((char[])token.getCredentials());
        User user = userService.findByAccount(account);
        if(user == null){
            return  null;
        }
        if(!pass.equals(user.getPassword())){
            return null;
        }
        String acc = (String)token.getPrincipal();
        String password = new Md5Hash(pass,acc).toHex();
        return new SimpleAuthenticationInfo(user, pass,this.getClass().getName());//放入shiro.调用CredentialsMatcher检验密码
    }
    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principal) {
        System.out.println("--------------------------------role");
        User user=(User) principal.fromRealm(this.getClass().getName()).iterator().next();//获取session中的用户
        List<String> permissions=new ArrayList<>();
        List<String> rolelist=new ArrayList<>();
        Set<Role> roles = user.getRoles();
        if(roles.size()>0) {
            for(Role role : roles) {
                rolelist.add(role.getRname());
                Set<Module> modules = role.getModules();
                if(modules.size()>0) {
                    for(Module module : modules) {
                        permissions.add(module.getMname());
                    }
                }
            }
        }
        SimpleAuthorizationInfo info=new SimpleAuthorizationInfo();
        info.addRoles(rolelist);
        info.addStringPermissions(permissions);//将权限放入shiro中.
        return info;
    }

}
