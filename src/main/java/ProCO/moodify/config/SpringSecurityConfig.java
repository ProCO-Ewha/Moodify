package ProCO.moodify.config;

import jakarta.servlet.DispatcherType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SpringSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .authorizeHttpRequests(request -> request
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/members/new")).permitAll() // 특정 엔드포인트에 대한 접근 권한을 허용
                        .anyRequest().authenticated()	// 어떠한 요청이라도 인증필요
                )
                .formLogin(login -> login
//                        .loginProcessingUrl("/login-process")    // [B] 로그인 처리 URL 지정
                        .usernameParameter("email")    // [C] 요청 본문에서 사용자 아이디를 어떻게 찾을지 지정
                        .passwordParameter("password")    // [D] 요청 본문에서 비밀번호를 어떻게 찾을지 지정
                        .defaultSuccessUrl("/calendar/redirect-calendar", true)
                        .permitAll()
                )
                .logout(withDefaults());	// 로그아웃은 기본설정으로 (/logout으로 인증해제)

        return http.build();
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new SimplePasswordEncoder();
    }
}