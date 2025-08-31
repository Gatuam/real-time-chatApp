import React from "react";
import { useChatStore } from "../store/useChatStore";
import SiderBar from "../components/SiderBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="pt-6">
      <div className=" flex items-center justify-center  px-5">
        <div className=" bg-base-100/50 border border-accent/20 rounded-lg shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className=" flex h-full rounded-lg overflow-hidden">
            <SiderBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
