import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Validate required environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  if (!process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT_EXPIRES_IN is missing in environment variables");
  }

  if (!process.env.COOKIE_MAX_AGE) {
    throw new Error("COOKIE_MAX_AGE is missing in environment variables");
  }

  // Generate token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Set cookie
  res.cookie("jwt", token, {
    maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
};
