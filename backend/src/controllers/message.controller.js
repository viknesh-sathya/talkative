import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
    res.status(200).json({ status: "success", data: { users: filteredUsers } });
  } catch (err) {
    console.log("Error in getAllContacts:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find all messages involving the logged-in user
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    // Extract unique partner IDs
    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.equals(loggedInUserId) ? msg.receiverId : msg.senderId,
        ),
      ),
    ];

    // Fetch partner user details
    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } });

    res.status(200).json({
      status: "success",
      data: { chatPartners },
    });
  } catch (err) {
    console.error("Error in getChatPartners:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (err) {
    console.log("Error in getMessagesByUserId:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};
const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validate input
    if (!text && !image) {
      return res.status(400).json({
        status: "failed",
        message: "Message must contain text or an image",
      });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "talkative/messages",
        resource_type: "image",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // TODO: send message in real-time if user is online (SOCKET IO)

    res.status(201).json({
      status: "success",
      data: { message: newMessage },
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({
      status: "error",
      message: "Server error while sending message",
    });
  }
};

const messageController = {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
};
export default messageController;
