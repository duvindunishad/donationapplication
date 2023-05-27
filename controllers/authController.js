import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Jwt from "jsonwebtoken";
import multer from "multer";

// configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".public/images/humanphoto/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only .jpeg, .jpg and .png files are allowed!"));
  }
}

export const registerController = async (req, res) => {
  try {
    const { nic, name, email, password, phone, address, answer, photo } =
      req.body;
    // validation part
    if (!nic) {
      return res.send({ message: "Nic is required" });
    }
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }
    if (!photo) {
      return res.send({ message: "Photo is required" });
    }

    //check the existing NIC
    const existingUsers = await userModel.findOne({ nic });
    if (existingUsers) {
      return res.status(200).send({
        success: true,
        message: "Already registered nic, please login",
      });
    }
    // check the existing users
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered email, please login",
      });
    }

    // post("/upload", upload.single("photo"), (req, res, next) => {
    //   if (!req.file) {
    //     res.status(400).json({ message: "No file uploaded." });
    //     return;
    //   }
    //   res.status(200).json({
    //     message: "File uploaded successfully.",
    //     imageUrl: `images/${req.file.filename}`,
    //   });
    // });

    // save the image to MongoDB
    upload.single("photo")(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "Error uploading image",
          error: err,
        });
      }

      // const photo = req.file ? req.file.filename : null;

      // register user
      const hashedPassword = await hashPassword(password);

      // save user with photo
      const user = new userModel({
        nic,
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        answer,
        photo: req.file ? req.file.path : null,
      }).save();

      res.status(201).send({
        success: true,
        message: "User registration successful",
        user,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Registration error",
      error,
    });
  }
};

//post login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalided email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(401).send({ message: "NewPassword is required" });
    }
    //CHECK
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected route");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update profile
// export const updateProfileController = async (req, res) => {
//   try {
//     const { name, email, password, address, phone, role } = req.body;
//     const user = await userModel.findById(req.user._id);

//     // Password
//     if (password && password.length < 6) {
//       return res.json({
//         error: "Password is required and should be at least 6 characters long",
//       });
//     }
//     const hashedPassword = password ? await hashPassword(password) : undefined;

//     // Update user fields
//     const updatedUserFields = {
//       name: name || user.name,
//       password: hashedPassword || user.password,
//       phone: phone || user.phone,
//       address: address || user.address,
//       role: role || user.role, // Add role update
//     };

//     const updatedUser = await userModel.findByIdAndUpdate(
//       req.user._id,
//       updatedUserFields,
//       { new: true }
//     );

//     res.status(200).send({
//       success: true,
//       message: "Profile Updated Successfully",
//       updatedUser,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       success: false,
//       message: "Error While Updating Profile",
//       error,
//     });
//   }
// };

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        // role: role || user.role, // Add role update
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// export const updateRoleController = async (req, res) => {
//   try {
//     //const { id } = req.params;
//     //const user = await userModel.findById(req.user.role);
//     userModel.findByIdAndUpdate(
//       // req.user.role,
//       // {
//       //   role: newRole || user.role, // Add role update
//       // },
//       // { new: true }
//       req.params.id,
//       {
//         role: "admin",
//       }
//     );
//     res.status(200).send({
//       success: true,
//       message: "Role Updated SUccessfully",
//       users,
//     });
//   } catch (error) {
//     console.log(error, 'error');
//     res.status(400).send({
//       success: false,
//       message: "Error WHile Update Role",
//       error,
//     });
//   }
// };

//update role
export const updateRoleController = async (req, res) => {
  try {
    // console.log("jsdjakf");
    const { newRole } = req.body;
    //const user = await userModel.findById(req.user.role);
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body // Add role update
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Role Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update Role",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
};

// All orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
};

//orders
export const getAllOrdersControl = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Getting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};
