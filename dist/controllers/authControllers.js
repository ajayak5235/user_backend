import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Auth from "../models/authModel.js";
const generateToken = (id) => {
    return jwt.sign({ id }, 'secret', {
        expiresIn: "30d",
    });
};
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // Check if user exists
        const userExists = await Auth.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create user
        const user = await Auth.create({
            username,
            email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201).json({
                id: user.id,
                message: "welcome to user Management"
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        // Handle errors
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user.id);
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                token,
            });
        }
        else {
            console.log("Invalid Email or Password");
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
