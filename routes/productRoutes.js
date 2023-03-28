import express from "express";
import { createProductController } from "../controllers/ProductController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

//below can chane the create product path in user dash board or admin dashboard
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
export default router;
