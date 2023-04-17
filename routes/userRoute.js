// import { isAdmin } from "../middlewares/authMiddlewares";
import express from "express";
//const express = "express";
const router = express.Router();
import {
  deleteUserController,
  getAllUsersController,
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";

// Route for getting all users
router.get("/all-users", getAllUsersController);

//delete user
router.delete(
  "/delete-users/:id",
  deleteUserController,
  isAdmin,
  requireSignIn
);

export default router;
