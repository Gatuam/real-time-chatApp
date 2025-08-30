import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-[#a8ff57]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Setting />} />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
};

export default App;
