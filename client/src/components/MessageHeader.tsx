import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { RxCross1 } from "react-icons/rx";

const MessageHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();
  return (
    <div className=" p-2 border-b border-base-300">
      <div className=" flex items-center justify-between px-3 py-1">
        <div className=" flex items-center gap-3">
          <div className=" avatar">
            <div className=" size-9 rounded-full relative">
              <img
                src={selectedUser?.profilePicture || "/avatar.png"}
                alt={selectedUser?.username || "Profilepic"}
              />
            </div>
          </div>

          <div>
            <h3 className=" font-medium">{selectedUser?.username} </h3>
            <p className=" text-sm text-base-content/60">
              {onlineUsers?.includes(selectedUser?.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
         <button 
         className=" cursor-pointer "
         onClick={() => setSelectedUser(null)}>
        <RxCross1 />
      </button>
      </div>
     
    </div>
  );
};

export default MessageHeader;
