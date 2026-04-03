import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageInput from "./MessageInput";
import getDateLabel from "../utils/getDateLable";

const ChatContainer = () => {
  const { messages, getMessagesByUserId, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);
  useEffect(() => {
    getMessagesByUserId(selectedUser?._id);
  }, [getMessagesByUserId, selectedUser]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 ">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => {
              const currentLabel = getDateLabel(msg.createdAt);
              const prevLabel =
                index > 0 ? getDateLabel(messages[index - 1].createdAt) : null;

              return (
                <div key={msg._id}>
                  {currentLabel !== prevLabel && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                        {currentLabel}
                      </span>
                    </div>
                  )}

                  <div
                    className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                  >
                    <div
                      className={`chat-bubble relative ${
                        msg.senderId === authUser._id
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="Shared"
                          className="rounded-lg h-48 object-cover"
                        />
                      )}
                      {msg.text && <p className="mt-2">{msg.text}</p>}
                      <p className="text-xs mt-1 opacity-40">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
