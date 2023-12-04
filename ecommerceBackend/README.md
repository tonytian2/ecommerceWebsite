# This is Ecommerce project's backend.

### Need to configure .env in src/main/resource

    MYSQL_PASSWORD=xxxxxx

### Need to configure application.properties file
    spring.datasource.url=jdbc:mysql://localhost:3306/ecommercedb
    spring.datasource.username=root
    spring.datasource.password=${MYSQL_PASSWORD}

### Make sure React Frontend is running on http://localhost:3000/
#### You can change allowed frontend port in the backend src/main/java/com.fdmgroup.tony.ecommerceBackend3/sercurity.config/WebSecurityConfig.java

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        ...
    }