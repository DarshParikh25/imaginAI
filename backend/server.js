import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000; // Default port if not specified in .env
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'https://your-frontend.onrender.com',
    credentials: true
}));

await connectDB(); // Connect to MongoDB

app.use('/api/user', userRouter); // User routes
app.use('/api/image', imageRouter); // Image routes

app.get('/', (req, res) => {
    res.send('API Working!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});