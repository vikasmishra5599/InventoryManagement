package com.poc.InventoryManagement.security;

import com.poc.InventoryManagement.exception.ErrorHandler;
import com.poc.InventoryManagement.service.UserDetailService;
import com.poc.InventoryManagement.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    private final ErrorHandler errorHandler;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailService userService;

    public WebSecurityConfig(
            ErrorHandler errorHandler,
            JwtAuthenticationFilter jwtAuthenticationFilter,
            @Lazy UserDetailService userService) {
        this.errorHandler = errorHandler;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService;
    }


    //Enable access to swagger , h2 ..
    @Bean
    @Order(0)
    public SecurityFilterChain anonymousFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests().antMatchers("/ims/unsecure/saveresetpassword/",
                        "/ims/unsecure/forgotpassword/",
                        "/h2-console/**",
                        "/v3/api-docs/**",
                        "/swagger-ui/**"
                ).permitAll().and()
                .requestCache().disable().csrf().disable()
                .securityContext().disable()
                .sessionManagement().disable();

        return http.build();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain basicFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling()
                .and()
                .antMatcher("/api/v1/basic/**")
                .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .addFilter(new BasicAuthenticationFilter(authenticationManager(), new BasicAuthenticationEntryPoint()));
        return http.build();
    }

    @Bean
    public SecurityFilterChain jwtFilterChain(HttpSecurity http) throws Exception {
        return http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .accessDeniedHandler(errorHandler)
                .authenticationEntryPoint(errorHandler)
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/ims/auth/token", "/ims/auth/refresh").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(daoAuthenticationProvider())
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return authentication -> {
            String username = authentication.getName();
            String rawPassword = authentication.getCredentials().toString();
            var user = userService.loadUserByUsername(username);
            if (!passwordEncoder().matches(rawPassword, user.getPassword())) {
                throw new BadCredentialsException("Wrong password");
            }
            if (!user.isEnabled()) {
                throw new DisabledException("User is disabled");
            }
            return new UsernamePasswordAuthenticationToken(username, "[PROTECTED]", user.getAuthorities());
        };
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userService);
        provider.setUserDetailsPasswordService(userService);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(5);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
        configuration.addAllowedMethod(HttpMethod.PUT);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
