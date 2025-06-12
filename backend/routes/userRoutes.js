import express from "express";
import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Create a new router instance
const userRouter = express.Router();

userRouter.post("/register", registerUser); // Route for user registration
userRouter.post("/login", loginUser); // Route for user login
userRouter.get("/credits", authMiddleware, userCredits); // Route for user credits balance

export default userRouter;

// This endpoint will be used in the frontend to interact with the user authentication system.
// The routes are as follows:
// http://localhost:4000/api/user/register - for user registration
// http://localhost:4000/api/user/login - for user login
// http://localhost:4000/api/user/buy-credits - for user credits balance (requires authentication)