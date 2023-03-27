import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

//confegure the env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>welcome to donation application</h1>");
});

//port, here add 8080 port , if their any erro from the env file ,but port will work perfect
const port = process.env.port || 8080;

//run list

app.listen(port, () => {
  console.log(
    `server run on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white
  );
});
