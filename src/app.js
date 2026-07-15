import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express()

app.use((req, res, next) => {
    // We only allow requests that have the Gateway's Secret Shield Header
    if (req.headers['x-shield'] !== process.env.SECRET_KEY) {
        return res.status(403).json({ error: "Access Denied: Direct traffic forbidden." });
    }
    next();
});

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true ,limit: "16kb"}))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import postRouter from "./routes/post.routes.js";

app.use('/api/v1/users' , userRouter)

app.use('/api/v1/posts' , postRouter)
app.get('/', (req,res) => {
    res.send(`hello , express`)
})

export {app}