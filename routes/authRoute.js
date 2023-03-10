import express from "express";
import { registerController, loginController } from "../controllers/authController.js";

//rout object
const router = express.Router();

//routing
//register|| method post

router.post("/register", registerController);

//login ||post
router.post("/login",loginController);


export default router;