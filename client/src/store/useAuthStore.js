import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : "https://real-time-chatapp-fd97.onrender.com";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: true,
      isSigningUp: false,
      isLogginIn: false,
      isUpdatingProfile: false,
      onlineUsers: [],
      socket: null,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check-auth", {
            withCredentials: true,
          });
          if (res?.data) {
            set({ authUser: res.data });
            get().connectSocket();
          } else {
            set({ authUser: null });
          }
        } catch (error) {
          console.log("Auth check error:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signUp: async (data, navigate) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data, {
            withCredentials: true,
          });
          toast.success("Account created successfully");
          navigate("/login");
          return res.data;
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
          );
        } finally {
          set({ isSigningUp: false });
        }
      },

  
      login: async (data, navigate) => {
        set({ isLogginIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
          });
          if (res?.data) {
            set({ authUser: res.data });
            toast.success("Login successful");
            get().connectSocket();
            navigate("/");
          }
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
          );
        } finally {
          set({ isLogginIn: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post(
            "/auth/logout",
            {},
            { withCredentials: true }
          );
          get().disconnectSocket();
          set({ authUser: null });
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
          );
        }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
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
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket = io(BASE_URL, {
          query: { userId: authUser?.id },
        });

        set({ socket: newSocket });

        newSocket.on("connect", () => {
          console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("getOnlineUser", (usersId) => {
          set({ onlineUsers: usersId });
          console.log("Online users:", usersId);
        });
      },
      
      disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) {
          socket.disconnect();
          console.log("Socket disconnected:", socket.id);
          set({ socket: null });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
