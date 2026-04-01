import express from "express";
import messageController from "../controllers/message.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = express.Router();

// the middlewares execute in order - so requests get rate-limited first, then authenticated.
// this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
if (process.env.NODE_ENV === "production") router.use(arcjetProtection);
router.use(protect);

router.get("/contacts", messageController.getAllContacts);
router.get("/chats", messageController.getChatPartners);
router.get("/:id", messageController.getMessagesByUserId);

router.post("/send/:id", messageController.sendMessage);

export default router;
