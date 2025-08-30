import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isCheckingAuth: true,
      isSigningUp: false,
      isLogginIn: false,
      isUpdateingProfile: false,
      onlineUsers: [],

      // ✅ checkAuth
      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/auth/check-auth", {
            withCredentials: true,
          });
          set({ authUser: res.data });
        } catch (error) {
          console.log("error in authCheck", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // ✅ signUp
      signUp: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          return res.data;
        } catch (error) {
          const messageError =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          toast.error(messageError);
        } finally {
          set({ isSigningUp: false });
        }
      },

      // ✅ login
      login: async (data, navigate) => {
        set({ isLogginIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
          });
          set({ authUser: res.data });
          toast.success("Login Successfully");

          if (res?.data) {
            navigate("/");
          }
        } catch (error) {
          const messageError =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          toast.error(messageError);
        } finally {
          set({ isLogginIn: false });
        }
      },

      // ✅ logout
      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          const messageError =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";
          toast.error(messageError);
        }
      },

      // ✅ updateProfile
      updateProfile: async (data) => {
        set({ isUpdateingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-prfile", data, {
            withCredentials: true,
          });
          set({ authUser: res.data.updateUser });
          toast.success("Profile updated successfully");
          return res.data.updateUser;
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
          );
        } finally {
          set({ isUpdateingProfile: false });
        }
      },
    }),
    {
      name: "auth-storage", 
      partialize: (state) => ({ authUser: state.authUser }), 
    }
  )
);
