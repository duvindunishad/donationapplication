import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../controllers/ProductController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

//below can change the create product path in user dash board or admin dashboard
router.post(
  "/create-product",
  requireSignIn,
  //isAdmin,
  formidable(),
  createProductController
);
//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  //  isAdmin,
  formidable(),
  updateProductController
);

//get product
router.get("/get-product", getProductController);

//get a single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.get("/product/:pid", deleteProductController);

export default router;
