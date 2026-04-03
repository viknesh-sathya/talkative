import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    console.log("SOCKET-cookie :", socket.handshake.headers.cookie);
    // Parse cookies safely (cookie is a package)
    const cookies = socket.handshake.headers.cookie
      ? cookie.parse(socket.handshake.headers.cookie)
      : {};
    const token = cookies?.jwt;

    //this method is very brittle
    /*const token = socket.handshake.headers.cookie?.split("; ").find((row) => row.startsWith("jwt="))?.split("=")[1];
     */
    if (!token) {
      console.warn("Socket rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.warn("Socket rejected: Token expired");
        return next(new Error("Unauthorized - Token Expired"));
      }
      console.warn("Socket rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.warn("Socket rejected: User not found");
      return next(new Error("Unauthorized - User Not Found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();
    console.info(`Socket authenticated: ${user.fullName} (${user._id})`);

    next();
  } catch (err) {
    console.error("Socket auth error:", err.message);
    next(new Error("Unauthorized - Authentication Failed"));
  }
};
