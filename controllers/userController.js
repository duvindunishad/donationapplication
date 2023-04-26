// import productModel from "../models/productModel.js";
// import categoryModel from "../models/categoryModel.js";
// import orderModel from "../models/orderModel.js";
// import fs from "fs";
import slugify from "slugify";
// import braintree from "braintree";
// import dotenv from "dotenv";
// import { userProductControl } from "./ProductController.js";
import userModel from "../models/userModel.js";

// Controller function for getting all users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All Users Fetched",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting users",
      error,
    });
  }
};

//delete user

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error,
    });
  }
};

//manage user's role
export const updateUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Find the user by ID
    const users = await userModel.findById(id);

    // Check if the user exists
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user's role
    users.role = role;

    // Save the updated user in the database
    await users.save();

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "User role has been updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
