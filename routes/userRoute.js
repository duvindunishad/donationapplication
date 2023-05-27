// import { isAdmin } from "../middlewares/authMiddlewares";
import express from "express";
//const express = "express";
const router = express.Router();
import {
  deleteUserController,
  getAllUsersController,
  updateUserRole,
} from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js";
import {
  updateProfileController,
  updateRoleController,
} from "../controllers/authController.js";

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
  "/update-role/:id",
  //"/update-role/:id/role",
  requireSignIn,
  updateRoleController,
  updateProfileController
  // updateUserRole

  // isAdmin,
  // isUser
  // isAdmin,
);

export default router;
