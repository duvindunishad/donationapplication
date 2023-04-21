import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";

//configure the env
dotenv.config();

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/users", userRoute);

//old
//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>welcome to donation application</h1>");
// });
//rest api
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//port, here add 8080 port , if their any erro from the env file ,but port will work perfect
const port = process.env.PORT || 8080;

//run list

app.listen(port, () => {
  console.log(
    `server run on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white
  );
});
