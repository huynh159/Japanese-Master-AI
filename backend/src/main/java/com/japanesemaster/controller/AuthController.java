package com.japanesemaster.controller;

import com.japanesemaster.dto.auth.AuthResponse;
import com.japanesemaster.dto.auth.LoginRequest;
import com.japanesemaster.dto.auth.MessageResponse;
import com.japanesemaster.dto.auth.RegisterRequest;
import com.japanesemaster.model.Role;
import com.japanesemaster.model.UserEntity;
import com.japanesemaster.repository.UserRepository;
import com.japanesemaster.security.UserDetailsImpl;
import com.japanesemaster.security.jwt.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Đăng ký tài khoản người học (Member/User)
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Lỗi: Tên đăng nhập đã được sử dụng!"));
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Lỗi: Email này đã được đăng ký tài khoản!"));
        }

        UserEntity user = new UserEntity(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getFullName(),
                Role.ROLE_USER
        );

        if (registerRequest.getTargetLevel() != null && !registerRequest.getTargetLevel().isEmpty()) {
            user.setTargetLevel(registerRequest.getTargetLevel());
        }

        UserEntity savedUser = userRepository.save(user);

        String jwt = jwtUtils.generateJwtToken(savedUser.getUsername(), savedUser.getRole().name(), savedUser.getId());

        AuthResponse response = new AuthResponse(
                jwt,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole().name(),
                savedUser.getTargetLevel(),
                savedUser.getXp(),
                savedUser.getStreakDays(),
                "Đăng ký tài khoản thành công! Chào mừng bạn đến với cộng đồng Vua Tiếng Nhật."
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Đăng nhập thông thường cho học viên và admin
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            UserEntity user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy người dùng."));

            String jwt = jwtUtils.generateJwtToken(user.getUsername(), user.getRole().name(), user.getId());

            AuthResponse response = new AuthResponse(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole().name(),
                    user.getTargetLevel(),
                    user.getXp(),
                    user.getStreakDays(),
                    "Đăng nhập thành công!"
            );

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(false, "Tài khoản hoặc mật khẩu không chính xác!"));
        }
    }

    /**
     * Đăng nhập Admin chuyên biệt (Tương thích 100% với Frontend React Modal Admin)
     */
    @PostMapping("/admin-login")
    public ResponseEntity<?> authenticateAdmin(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            UserEntity user = userRepository.findByUsername(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Lỗi: Không tìm thấy người dùng."));

            // Kiểm tra phân quyền: Bắt buộc phải có Role ROLE_ADMIN
            if (user.getRole() != Role.ROLE_ADMIN) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse(false, "Từ chối truy cập: Tài khoản này không có quyền Quản trị viên (Admin)!"));
            }

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(user.getUsername(), user.getRole().name(), user.getId());

            AuthResponse response = new AuthResponse(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getRole().name(),
                    user.getTargetLevel(),
                    user.getXp(),
                    user.getStreakDays(),
                    "Đăng nhập Admin thành công!"
            );

            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(false, "Tài khoản hoặc mật khẩu Admin không đúng!"));
        }
    }

    /**
     * Xác thực phiên làm việc hiện tại (Verify Token)
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() && 
            !"anonymousUser".equals(authentication.getPrincipal())) {
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            UserEntity user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);

            if (user != null) {
                Map<String, Object> resp = new HashMap<>();
                resp.put("success", true);

                Map<String, Object> userMap = new HashMap<>();
                userMap.put("id", user.getId());
                userMap.put("username", user.getUsername());
                userMap.put("email", user.getEmail());
                userMap.put("fullName", user.getFullName());
                userMap.put("displayName", user.getFullName() != null ? user.getFullName() : user.getUsername());
                userMap.put("role", user.getRole().name().replace("ROLE_", "").toLowerCase());
                userMap.put("fullRole", user.getRole().name());

                resp.put("user", userMap);
                return ResponseEntity.ok(resp);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse(false, "Phiên làm việc hết hạn hoặc token không hợp lệ!"));
    }

    /**
     * Lấy thông tin cá nhân của người dùng hiện tại
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || 
            "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(false, "Chưa xác thực người dùng!"));
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        UserEntity user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng."));

        return ResponseEntity.ok(user);
    }
}
