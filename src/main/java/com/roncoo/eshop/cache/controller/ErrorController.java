package com.roncoo.eshop.cache.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class ErrorController {
    @RequestMapping(value = "/404")
    public String error_404() {
        return "error/404";
    }

    /**
     * 500页面
     */
    @RequestMapping(value = "/500")
    public String error_500() {
        return "error/500";
    }

    @RequestMapping(value = "/403")
    public String error_403() {
        return "error/403";
    }
}
