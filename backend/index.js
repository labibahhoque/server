import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js"
import courseRoute from "./routes/courseRoute.js"
import oauthRoute from "./routes/oauthRoute.js"
import gradesRoute from "./routes/gradesRoute.js"
import attendanceRoute from "./routes/attendanceRoute.js"
import assignmentsRoute from "./routes/assignmentsRoute.js"
dotenv.config({});

const app = express();

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
import session from "express-session";
import MongoStore from "connect-mongo"; 

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      secure: false, 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);


const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/oauth", oauthRoute);
app.use("/api/v1/grades", gradesRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/assignment", assignmentsRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})