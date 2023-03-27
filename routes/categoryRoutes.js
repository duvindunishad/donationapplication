import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// routes for category routes

//create category routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category routes
router.put(
  "/update-category/:id", //here pass the category id to update category
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category routes
router.get("/get-category", categoryController);

//get single category routes
router.get("/single-category/:slug", singleCategoryController); //replace slug as id

//delete category routes
router.delete("/delete-category/:id", deleteCategoryCOntroller); //replace slug as id

export default router;
