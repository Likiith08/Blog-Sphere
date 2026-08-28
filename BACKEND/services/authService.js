const bcrypt = require("bcrypt");
const authRepository = require("../repositories/authRepository");

const jwt = require("jsonwebtoken");


class AuthService {

    async register(userData) {

        const { username, email, password } = userData;

        // Check if email already exists
        const existingUser = await authRepository.findByEmail(email);

        if (existingUser) {
            return {
                success: false,
                message: "Email already exists"
            };
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = {
            username,
            email,
            password: hashedPassword
        };


        await authRepository.createUser(newUser);

        return {
            success: true,
            message: "User Registered Successfully"
        };

    }
    async login(userData) {

    const { email, password } = userData;

    // Find User
    const user = await authRepository.findByEmail(email);

    if (!user) {
        return {
            success: false,
            message: "Invalid Email"
        };
    }

    // Compare Password
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        return {
            success: false,
            message: "Invalid Password"
        };
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return {
        success: true,
        message: "Login Successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    };

}

}

module.exports = new AuthService();