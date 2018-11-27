package com.roncoo.eshop.cache.interceptor;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootConfiguration
public class LoginAdapter extends WebMvcConfigurerAdapter {

    @Bean
    public LoginInterceptor getSecurityInterceptor() {
        return new LoginInterceptor();
    }
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration addInterceptor = registry.addInterceptor(getSecurityInterceptor());
        //排除的路径
        addInterceptor.excludePathPatterns("/error/**");
        addInterceptor.excludePathPatterns("/login/**");
        addInterceptor.excludePathPatterns("/Wopop_files/**");
        //拦截所有路径
        addInterceptor.addPathPatterns("/**");



    }


}
