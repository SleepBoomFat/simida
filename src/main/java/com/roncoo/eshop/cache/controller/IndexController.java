package com.roncoo.eshop.cache.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Configuration
@Controller
public class IndexController  {
    @RequestMapping("/")
    public ModelAndView _hello(){
        return new ModelAndView("redirect:/login/login");
    }
    @RequestMapping("/403")
    public ModelAndView _403(){
        return new ModelAndView("redirect:/error/403");
    }

}
