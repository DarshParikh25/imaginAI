import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
// take input(name, email, password) -> check if all fields are filed -> encrypt password using bcrypt -> save the user data in the database using userModel -> generate token using JWT(jsonwebtoken) -> return success response with token and user data
// If any error occurs, return error response with message
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.json({success: false, message: "Please fill all the fields. Some fields are missing."});
        }

        const salt  = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUserDAta = {
            name,
            email,
            password: encryptedPassword,
        }
        const newUser = new userModel(newUserDAta);
        const user = await newUser.save();

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.json({
        success: true,
        token,
        user: {
            name: user.name
        }
    })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message || "Something went wrong while registering the user. Please try again."
        });
    }
}

// Login a user
// take input(email, password) -> check whether all the fields are filled -> check whether the email of the user exists in the data bse or not -> compare the password with the encrypted password in the database -> check whether user exists or not -> if does not exists, then send the error message through response -> if user exists, then generate token using JWT(jsonwebtoken) -> return success response with token and user data
// If any error occurs, return error response with message
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.json({success: false, message: "Please fill all the fields. Some fields are missing."});
        }

        const user = await userModel.findOne({ email });

        if(!user) {
            return res.json({success: false, message: "User does not exists. Please register first."});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.json({success: false, message: "Invalid credentials. Please try again."});
        } else {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET
            )
            res.json({
                success: true,
                token,
                user: {
                    name: user.name
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message || "Something went wrong while logging in the user. Please try again."
        })
    }
}

// Check credits balance
const userCredits = async (req, res) => {
    try {
        // const { userId } = req.body; // This is not needed as body is not sent in the request
        // Instead, we can get userId from the request object which is set by the auth middleware
        const { userId } = req;
        const user = await userModel.findById(userId);

        res.json({
            success: true,
            credits: user.creditsBalance,
            user: {
                name: user.name
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message || "Something went wrong while fetching credits. Please wait for a while."
        })
    }
}

export { registerUser, loginUser, userCredits };