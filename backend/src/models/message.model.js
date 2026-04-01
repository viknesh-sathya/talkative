import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "senderId is a required field"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "receiverId is a required field"],
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    image: String,
  },
  { timestamps: true },
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
