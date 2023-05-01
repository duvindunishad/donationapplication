import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//PROTECT THE ROUTES WITH TOKEN BASE

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = Jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // if (user.role !== 1) { change this to below one
    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

//donation receiver access
export const isDonationreciver = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // if (user.role !== 1) { change this to below one
    if (user.role !== "donationreciver") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in donationreciver middleware",
    });
  }
};

//user access
export const isUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // if (user.role !== 1) { change this to below one
    if (user.role !== "users") {
      return res.status(401).send({
        success: false,
        message: "UnAuthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in User middleware",
    });
  }
};
