import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { signUp, isSigningUp } = useAuthStore();

  const validForm = () => {
    if (!formData.username.trim()) {
      return toast.error("Username is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Please enter a correct email");
    }
    if (!formData.password.trim()) {
      return toast.error("Please enter password");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validForm();
    if (success === true) {
      signUp(formData);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.15) 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
      className="min-h-screen flex justify-center items-center  gap-50  "
    >
      <div className="left flex flex-col justify-center items-center p-6 sm:p-12">
        <div
          className="flex flex-col items-center gap-2 group px-9 py-20 border rounded-lg border-[#0000004f] bg-gradient-to-b from-[#11111131] to-[#1313136e] w-105 h-140 
         shadow-[_0px_1px_1px_0px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.04),0_2px_3px_rgba(0,0,0,0.04)]
        "
        >
          <div className="size-12 rounded-xl bg-neutral-100/10 flex items-center justify-center group-hover:bg-neutral-200/20 transition-colors">
            <MessageSquare className="size-6 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-sm  tracking-wider">
            Get started with you free account
          </p>
          <div className="flex flex-col gap-4 justify-between items-center">
            <form
              className="flex flex-col gap-3 w-80 mt-4 justify-center items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="input input-neutral focus:outline-none focus:ring-0"
              />
              <input
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input input-neutral focus:outline-none focus:ring-0"
              />
              <input
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input input-neutral focus:outline-none focus:ring-0"
              />
              <button disabled={isSigningUp} className="btn btn-neutral w-40">
                Signup
              </button>
            </form>
            <p className="text-sm text-neutral-400 mt-4">
              Already have an Account?{" "}
              <Link to="/login" className="text-cyan-400 cursor-pointer">
                {" "}
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12">
        <div
          className="flex flex-col justify-between gap-4 p-5 border rounded-lg border-[#0000004f] bg-gradient-to-b from-[#11111131] to-[#1313136e]
        group-hover:bg-neutral-500/100
        "
        >
          <div className=" flex gap-2 group ">
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
          </div>
          <div className=" flex gap-2 group">
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
          </div>
          <div className=" flex gap-2 group   ">
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
            <div className="bg-[#1b1b1b1e] border border-[#c2c2c22d] w-30 h-30 rounded-lg"></div>
          </div>
          <div className=" flex flex-col justify-center items-center gap-2 group mt-2  ">
            <h1 className="text-2xl font-bold text-[#c9c9c9e1]">
              Join Our Community
            </h1>
            <p className=" self-center w-90 text-center text-sm mb-4 text-[#dbdbdb6e]">
              Connect with friend and share mo ment, stay in touch we love and
              care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
