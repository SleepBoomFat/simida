package com.roncoo.eshop.cache;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import com.roncoo.eshop.cache.listener.InitListener;

import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPoolConfig;

@EnableAutoConfiguration
@SpringBootApplication
@ComponentScan
@Configuration
@MapperScan("com.roncoo.eshop.cache.dao")
public class Application {

    @Bean

    @ConfigurationProperties(prefix="spring.datasource")
    public DataSource dataSource() {
        DataSource dataSource = new DataSource();
        dataSource.setUrl("jdbc:mysql://47.99.108.50:3306/xsd446");
        dataSource.setUsername("caokun");
        dataSource.setPassword("Ck163com!");
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        return dataSource;

    }
    
    @Bean
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:/mybatis/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }
 
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    
    @Bean
    public JedisCluster JedisClusterFactory() {
        Set<HostAndPort> jedisClusterNodes = new HashSet<HostAndPort>();
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7000));
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7001));
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7002));
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7003));
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7004));
        jedisClusterNodes.add(new HostAndPort("47.99.108.50", 7005));
        JedisPoolConfig poolConfig = new JedisPoolConfig();
        poolConfig.setMaxTotal(300);
        poolConfig.setMaxIdle(10);
        poolConfig.setMaxWaitMillis(1000);
        JedisCluster jedisCluster = new JedisCluster(jedisClusterNodes, 50000, 50000, 5, "ck123" ,poolConfig);
        return jedisCluster;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@Bean
    public ServletListenerRegistrationBean servletListenerRegistrationBean() {
    	ServletListenerRegistrationBean servletListenerRegistrationBean = 
    			new ServletListenerRegistrationBean();
    	servletListenerRegistrationBean.setListener(new InitListener());  
    	return servletListenerRegistrationBean;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
    
}