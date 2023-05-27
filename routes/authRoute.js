import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
 
  getAllOrdersControl,
  getAllOrdersController,
  orderStatusController,
  updateRoleController,
} from "../controllers/authController.js";
import {
  isAdmin,
  isDonationreciver,
  isUser,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
import formidable from "express-formidable";

//rout object
const router = express.Router();

//routing
//register|| method post

router.post("/register", registerController, formidable());

//login ||post
router.post("/login", loginController);

//forgot password

router.post("/forgot-password", forgotPasswordController);
//test route
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected user route auth
router.get(
  "/donationreciver-auth",
  requireSignIn,
  isDonationreciver,
  (req, res) => {
    res.status(200).send({ ok: true });
  }
);
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

// //orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get(
  "/all-orders",
  requireSignIn,
  isAdmin,

  getAllOrdersController
);

router.get("/all-order", requireSignIn, isUser, getAllOrdersControl);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,

  orderStatusController
);

//role
router.put(
  "/update-role/:id",
  requireSignIn,
  updateProfileController,
  updateRoleController
);

export default router;
