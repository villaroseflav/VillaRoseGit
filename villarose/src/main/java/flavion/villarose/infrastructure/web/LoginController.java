package flavion.villarose.infrastructure.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {
    // Load credentials from application.properties or environment
    @Value("${app.username}")
    private String envUsername;

    @Value("${app.password}")
    private String envPassword;

    // Expose an endpoint to authenticate the user based on env properties
    @GetMapping
    public Map<String, String> login() {
        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", envUsername);
        credentials.put("password", envPassword);
        return credentials;
    }
}

