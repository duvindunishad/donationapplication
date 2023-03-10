import express from "express";
import { registerController, loginController, testController, } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";
//rout object
const router = express.Router();

//routing
//register|| method post

router.post("/register", registerController);

//login ||post
router.post("/login",loginController);

//test route
router.get("/test", requireSignIn, testController);

export default router;