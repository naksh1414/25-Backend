export const MESSAGES = {
    // Success messages
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    UPDATE_SUCCESS: "User updated successfully",
    FETCH_SUCCESS: "User fetched successfully",
    OTP_VERIFY_SUCCESS: "OTP verified successfully",
    EVENT_CREATED:"Event created successfully",
    EVENT_UPDATED:"Event updated successfully",
    EVENT_DELETED:"Event deleted successfully",
    EVENT_FETCH:"Event fetched successfully",
    TEAM_ADDED:"Team added successfully",
    TEAM_FETCH:"Team fetched successfully",
    MEMBER_FETCH:"Member fetched successfully",
  
    // Error messages
    EMAIL_EXISTS: "Email already exists",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_OTP: "Invalid or expired OTP",
    USER_NOT_FOUND: "User not found",
    SERVER_ERROR: "Internal server error occurred",
    EVENT_NOT_FOUND:"Event not found",
  } as const;