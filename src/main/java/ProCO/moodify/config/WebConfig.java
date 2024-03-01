package ProCO.moodify.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 엔드포인트에 대해 CORS를 허용
                .allowedOrigins("http://localhost:3000")  // 허용할 출처 설정
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드 설정
                .allowedHeaders("*")  // 허용할 헤더 설정
                .allowCredentials(true)  // 자격 증명을 포함할지 여부 설정
                .maxAge(3600);  // pre-flight 요청의 최대 유효 시간 설정 (초 단위)
    }
}
