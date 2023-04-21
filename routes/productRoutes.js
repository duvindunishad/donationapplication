import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductById,
  getProductController,
  // getProductUserById,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  userProductControl,
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

router.get("/get-product-by-user", getProductById);

// //GET PRODUCT BY USER ID
// router.get("/get-product/:id", getProductUserById);

//get a single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

// product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//save order
router.post("/orders", requireSignIn, brainTreePaymentController);

//Request routes
//token
router.get("/braintree/token", braintreeTokenController);

//Requests
router.post("/braintree/request", requireSignIn, brainTreePaymentController);

router.get("/my-products", userProductControl);

export default router;
