import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import { useAuthStore } from "../store/useAuthStore";
import { formatDateTime } from "../lib/utils";
import { useRef } from "react";

const ChatContainer = () => {
  const messageContainerRef = useRef(null);
  const {
    getMessages,
    selectedUser,
    isMessagesLoading,
    messages,
    subcribeMessages,
    unsubMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?.id);
    subcribeMessages();
    return () => unsubMessages();
  }, [selectedUser.id, getMessages, subcribeMessages, unsubMessages]);

  useEffect(() => {
    if (messageContainerRef.current && messages) {
      messageContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <p>Loading......</p>;
  return (
    <div className="sidebar flex-1 flex flex-col overflow-auto">
      <MessageHeader />
      <div className="sidebar flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            ref={messageContainerRef}
            key={i}
            className={`chat ${
              message.senderId === authUser?.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className=" chat-image avatar">
              <div className=" size-9 rounded-full border">
                <img
                  alt="profic-pic"
                  src={
                    message?.senderId === authUser?.id
                      ? authUser?.profilePicture || "/avatar.png"
                      : selectedUser?.profilePicture || "/avatar.png"
                  }
                />
              </div>
            </div>
            <div className=" chat-header mb-1">
              <time
                className="text-xs opacity-45"
                dateTime={message?.createdAt}
              >
                {formatDateTime(message?.createdAt)}
              </time>
            </div>
            <div className=" chat-bubble flex">
              {message.image && (
                <img
                  src={message?.image}
                  alt="Messgae-img"
                  className=" sm:max-w-[200px]  rounded-lg mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
