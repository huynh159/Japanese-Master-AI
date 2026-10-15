package com.japanesemaster.dto.auth;

import java.util.HashMap;
import java.util.Map;

public class AuthResponse {

    private boolean success = true;
    private String token;
    private String tokenType = "Bearer";
    private String message;
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private String targetLevel;
    private int xp;
    private int streakDays;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String username, String email, String fullName, 
                        String role, String targetLevel, int xp, int streakDays, String message) {
        this.success = true;
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role;
        this.targetLevel = targetLevel;
        this.xp = xp;
        this.streakDays = streakDays;
        this.message = message;
    }

    // Convenience method for frontend compatibility
    public Map<String, Object> getUser() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("username", username);
        map.put("email", email);
        map.put("fullName", fullName);
        map.put("displayName", fullName != null ? fullName : username);
        map.put("role", role != null ? role.replace("ROLE_", "").toLowerCase() : "user");
        map.put("fullRole", role);
        map.put("targetLevel", targetLevel);
        map.put("xp", xp);
        map.put("streakDays", streakDays);
        return map;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getTargetLevel() { return targetLevel; }
    public void setTargetLevel(String targetLevel) { this.targetLevel = targetLevel; }

    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }

    public int getStreakDays() { return streakDays; }
    public void setStreakDays(int streakDays) { this.streakDays = streakDays; }
}
