package com.test.listflix.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Настроить CORS для всех эндпоинтов
        registry.addMapping("/**") // Разрешаем все пути
                .allowedOrigins("http://localhost:3000") // Разрешаем запросы с фронтенда на localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Разрешаем методы GET, POST, PUT, DELETE
                .allowedHeaders("*") // Разрешаем все заголовки
                .allowCredentials(true); // Разрешаем отправку куки
    }
}
