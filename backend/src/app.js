import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({
    limit: '16kb',
}));

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(express.static('public'));
app.use(cookieParser());

//  so from here we have routes 
import healthrouter from "./routes/healthcheck.routes.js";
import authrouter from "./routes/auth.routes.js"

// 3. Define Routes
app.get('/', (req, res) => {
    console.log("so its working");
    res.status(200).json({ message: "Server is running perfectly!" }); 
});

app.use("/api/v1/healthcheck", healthrouter);
app.use("/api/v1/auth", authrouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || []
    });
});

export default app;