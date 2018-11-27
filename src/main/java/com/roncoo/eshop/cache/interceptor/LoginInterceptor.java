package com.roncoo.eshop.cache.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
//        得到session

        HttpSession session = httpServletRequest.getSession(true);
        System.out.println("拦截器访问方法："+httpServletRequest.getServletPath());
//        得到对象
        Object user = session.getAttribute("user");
//        判断对象是否存在
        if(user!=null){
            return true;
        }else{
//            不存在则跳转到登录页
            httpServletResponse.sendRedirect(httpServletRequest.getContextPath()+"/login/login");
            return false;
        }
    }

    //    试图渲染之后执行
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    //    在请求处理之后,视图渲染之前执行
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

}
