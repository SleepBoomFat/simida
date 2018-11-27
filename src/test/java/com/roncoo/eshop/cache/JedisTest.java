package com.roncoo.eshop.cache;

import java.util.*;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;
import redis.clients.jedis.*;

public class JedisTest {
	
	public static void main(String[] args) throws Exception {
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
        jedisCluster.set("hehe","123");
        System.out.println( jedisCluster.get("hehe"));
        //jedisCluster.close();

       /* Properties props = new Properties();
        props.put("bootstrap.servers", "47.99.108.50:9093,47.99.108.50:9094,47.99.108.50:9095");
        props.put("acks", "all");

        //If the request fails, the producer can automatically retry,
        props.put("retries", 0);

        //Specify buffer size in config
        props.put("batch.size", 16384);

        //Reduce the no of requests less than 0
        props.put("linger.ms", 1);

        //The buffer.memory controls the total amount of memory available to the producer for buffering.
        props.put("buffer.memory", 33554432);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        Producer<String, String> producer = new KafkaProducer<String, String>(props);
        String topicName = "test";
        for (int i = 0; i < 10; i++)
            producer.send(new ProducerRecord<String,String>(topicName, Integer.toString(i), Integer.toString(i)));
        System.out.println("Message sent successfully");
        producer.close();*/

	}

}
