package com.etour.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages="com.etour.main.*")
@EnableJpaRepositories(basePackages="com.etour.main.*")
public class EtourApplication {

	public static void main(String[] args) {
		SpringApplication.run(EtourApplication.class, args);
	}

}
