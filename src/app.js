import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// middleware used 
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
}))
app.use(express.json({
    limit : "16kb"
}))
app.use(express.urlencoded({
    extended: true,
    limit : "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import  userRoutes  from "./routes/user.routes.js"

app.use("/api/v1/users", userRoutes)


export { app }   // can use the syntax export default app.