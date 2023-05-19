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
// export const updateUserRoleController = async (req, res) => {
//   try {
//     const { id } = req.params; // get the user ID from the request parameters
//     const { role } = req.body; // get the new role from the request body

//     User.findByIdAndUpdate(id, { role }, { new: true }, (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error" });
//       } else {
//         res.json(updatedUser);
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };
export const updateUserRoleController = async (req, res, next, id) => {
  try {
    await userModel.findByIdAndUpdate(id);
    // const users = await users.findByIdAndUpdate(req.params.role);
    if (!users) {
      res.status(404).send({ message: "User not found" });
    } else {
      users.role = req.body.role;
      const updatedUser = await users.save();
      res.status(200).send(updatedUser);
      message.success("user role updated successfully");
    }
  } catch (err) {
    next(err);
  }
};
