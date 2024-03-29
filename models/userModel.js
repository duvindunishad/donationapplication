import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      data: Buffer,
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // role: {
    //   type: Number,
    //   default: 0,
    // },
    role: {
      type: String,
      enum: ["users", "donationreciver", "admin"],
      default: "users",
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
