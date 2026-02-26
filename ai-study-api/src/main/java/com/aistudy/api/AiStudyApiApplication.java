package com.aistudy.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AiStudyApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiStudyApiApplication.class, args);
	}

}
