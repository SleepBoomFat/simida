package com.roncoo.eshop.cache;

import com.roncoo.eshop.cache.model.User;

import java.util.LinkedList;

public class Test {
    public static void main(String[] args){

        int[] array = {1,2,3,4,5,6,7};
        LinkedList<User> list = new LinkedList<>();//null
        //------------
        User caokun = new User();
        caokun.setUid(007);
        caokun.setUserName("曹坤");

        User wgf = new User();
        wgf.setUid(222);
        wgf.setUserName("王规范");
        //-------------
        list.add(caokun);
        list.add(wgf);
        for (User user:list) {
            System.out.println(user.getUserName());
        }
    }
}
