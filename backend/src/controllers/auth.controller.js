import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
  try {
    // Trim and normalize input
    const fullName = req.body.fullName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    // 1. Basic validations
    if (!fullName || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email format",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already registered",
      });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // 5. Generate auth token and set cookie
    generateToken(newUser._id, res);

    // 6. Remove password before sending response
    newUser.password = undefined;
    // 7. Send Email
    try {
      await sendWelcomeEmail(
        newUser.email,
        newUser.fullName,
        process.env.CLIENT_URL,
      );
    } catch (err) {
      console.log("❌Failed to send welcome emails");
    }

    return res.status(201).json({
      status: "success",
      message: "Account created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log("Error in signup controller", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later",
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    // 1. Basic validations
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // 2) Check user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Credentials" });
    }
    //3) Check Password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Credentials" });
    }

    // 4) Generate jwt token
    generateToken(user._id, res);

    res.status(200).json({
      status: "success",
      data: {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        },
      },
    });
  } catch (err) {
    console.error("Error in login controller:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

const logout = (_, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

const check = (req, res) => {
  const user = req.user; // from protect middleware
  res.status(200).json({
    status: "success",
    data: {
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    },
  });
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        status: "failed",
        message: "Profile picture is required",
      });
    }

    const userId = req.user._id; // coming from protect middleware

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "talketive/profile_pics",
      resource_type: "image",
    });

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while updating profile",
    });
  }
};

const authController = { signup, login, logout, check, updateProfile };
export default authController;
