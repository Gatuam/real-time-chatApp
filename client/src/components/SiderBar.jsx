import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SiderBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  console.log(users);
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <p>loading.......</p>;

  return (
    <aside className=" h-full w-20 lg:w-73 border-r border-base-300 flex flex-col transition-all duration-150">
      <div className=" border-b border-base-300 w-full p-5">
        <div className=" flex items-center gap-2">
          <Users className=" size-5" />
          <span className=" font-medium hidden lg:block">pussy</span>
        </div>
      </div>
      <div className=" overflow-y-auto w-full py-3 px-1 rounded-lg">
        {Array.isArray(users) &&
          users?.map((user) => (
            <button
              onClick={() => setSelectedUser(user)}
              key={user?.id}
              className={`
                    w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors rounded-lg
                    ${
                      selectedUser?.id === user?.id
                        ? "bg-base-300 ring-1 ring-base-300"
                        : ""
                    }
                    `}
            >
              <div className=" relative mx-auto lg:mx-0">
                <img
                  src={user?.profilePicture || "/avatar.png"}
                  alt={user?.username}
                  className=" size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user?.id) && (
                  <span className=" absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
              </div>
              <div className=" hidden lg:block text-left min-w-0">
                <div className=" font-medium truncate">
                  {user?.username || "user"}{" "}
                </div>
                <div>{onlineUsers.includes(user?.id) ? "online" : ""}</div>
              </div>
            </button>
          ))}
      </div>
    </aside>
  );
};

export default SiderBar;
