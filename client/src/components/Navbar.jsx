import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User2Icon } from "lucide-react";

const Navbar = ({ children }) => {
  const { logout, authUser } = useAuthStore();
  return (
    <div>
      {children}
      <div
        className="bg-[#00000000] border border-[#e9e9e925]  fixed top-0 z-10 backdrop-blur-sm w-full h-20  mx-auto px-6 flex items-center justify-between py-8 
      shadow-[_0px_1px_1px_0px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.04),0_2px_3px_rgba(0,0,0,0.04)]
      "
      >
        <div className="w-70">
          <Link to="/" className="flex justify-center items-center">
            <MessageSquare className="w-10 h-10 items-center text-[#0af0f052]"></MessageSquare>
            <h1 className=" text-[#00f1e565] text-2xl ml-3 ">
              Realtime Chatapp
            </h1>
          </Link>
        </div>
        <div className="flex gap-4">
          {!authUser && (
            <>
              <Link to="/setting">
                <div className="flex gap-2 text-[#08f5f59d] cursor-pointer border  border-[#00ffff41] px-2 py-1 rounded-md">
                  <Settings></Settings>
                  <h1> setting</h1>
                </div>
              </Link>
              <Link to="/profile">
                <div className="flex gap-2 text-[#08f5f59d] cursor-pointer border  border-[#00ffff41] px-2 py-1 rounded-md">
                  <User2Icon></User2Icon>
                  <h1> Profile</h1>
                </div>
              </Link>
            </>
          )}

          {authUser && (
            <div
              onClick={logout}
              className="flex gap-2 text-[#08f5f59d] cursor-pointer border  border-[#00ffff41] px-2 py-1 rounded-md"
            >
              <LogOut></LogOut>
              <h1>Logged out</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
