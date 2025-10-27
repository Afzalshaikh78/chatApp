//check if user is authenticated
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};
