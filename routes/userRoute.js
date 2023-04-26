// import { isAdmin } from "../middlewares/authMiddlewares";
import express from "express";
//const express = "express";
const router = express.Router();
import {
  deleteUserController,
  getAllUsersController,
  updateUserRoleController,
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

// update user role
router.put(
  "/update-role/:id/role",
  isAdmin,
  requireSignIn,
  updateUserRoleController
);

export default router;
