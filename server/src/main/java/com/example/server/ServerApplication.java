package com.example.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}


//import org.springframework.boot.autoconfigure.domain.EntityScan;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//
//@SpringBootApplication
//@EntityScan("com.example.server.entity")
//@EnableJpaRepositories("com.example.server.repository")
//public class ServerApplication {
//
//	public static void main(String[] args) {
//		SpringApplication.run(ServerApplication.class, args);
//	}
//}
