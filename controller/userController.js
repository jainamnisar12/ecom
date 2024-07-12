const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const dotenv = require("dotenv");
dotenv.config();

// Register a user
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate inputs
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are required");
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            email,
            password: hashedPassword,
        });
        user.save();

        // Redirect to login page after successful registration
        res.render("login");

    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    try {
        const user = await User.findOne({ email });

        // Compare password with hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        email: user.email,
                        id: user._id,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET, // Make sure this environment variable is properly set
                { expiresIn: "1h" }
            );

            // Store the access token securely (for example, in cookies or local storage)
            res.cookie("accessToken", accessToken, 
                { 
                    httpOnly: true 
                }); // Example of storing in a cookie
            res.redirect('/products'); // Redirect to dashboard after successful login
            // res.status(200).json({ message: "Login successful", accessToken });
        } else {
            res.status(401);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ error: "An error occurred while logging in" });
    }
};

const getloginUser = (req, res) => {
    res.render("login");
};

const getregisterUser = (req, res) => {
    res.render("register");
};

module.exports = { registerUser, loginUser, getloginUser, getregisterUser };
