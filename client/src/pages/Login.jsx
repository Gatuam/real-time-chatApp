import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isSigningUp, isLogginIn } = useAuthStore();

  const validForm = () => {
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
      login(formData);
    }
  };
  return (
    <>
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
            className="flex flex-col items-center justify-center gap-2 group px-9 py-10 border rounded-lg border-[#0000004f] bg-gradient-to-b from-[#11111131] to-[#1313136e] w-105 h-120 
             shadow-[_0px_1px_1px_0px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.04),0_2px_3px_rgba(0,0,0,0.04)]
            "
          >
            <MessageSquare className="size-6 text-neutral-400" />

            <h1 className="text-2xl font-bold mt-2">Loggin to your account</h1>
            <p className="text-sm  tracking-wider mb-2">
              Get started with you free account
            </p>
            <div className="flex flex-col gap-4 justify-between items-center">
              <form
                className="flex flex-col gap-3 w-80 mt-4 justify-center items-center"
                onSubmit={handleSubmit}
              >
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
                <button disabled={isLogginIn} className="btn btn-neutral w-40">
                  Login
                </button>
              </form>
              <p className="text-sm text-neutral-400 mt-4">
                Does not have an account yet?{" "}
                <Link to="/signup" className="text-cyan-400 cursor-pointer">
                  {" "}
                  signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
