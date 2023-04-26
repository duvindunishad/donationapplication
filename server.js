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
import { URL } from "url";

//configure the env
dotenv.config();

//database config
connectDB();

//es-module fix

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/users", userRoute);

//old
//rest api need to active when deploy offline localhost

app.get("/", (req, res) => {
  res.send("<h1><u>welcome to donation application</u></h1>");
});

//rest api need to active when deploy online

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
//     res.status(500).send(err);
//   });
// });

//port, here add 8080 port , if their any erro from the env file ,but port will work perfect
const PORT = process.env.PORT || 8080;

//run list

app.listen(PORT, () => {
  console.log(
    `server run on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
