import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
 origin:process.env.VITE_FRONTEND_URL,
 credentials:true
}))

const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send("express server work");
    });

    app.use("/api/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/admin", adminRouter);

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

startServer();