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
