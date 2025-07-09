import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogginIn: false,
  isUpdateingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth", {
        withCredentials: true,
      });
      set({ AuthUser: res.data });
      set({ IsCheckingAuth: false });
    } catch (error) {
      console.log("eror in authCheck", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signUp: async (data) => {
    console.log(data);
    set({
      isSigningUp: true,
    });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account create succefully");
    } catch (error) {
      const messageError =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(messageError);
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("logged out successfully");
    } catch (error) {
      const messageError =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(messageError);
    }
  },
  login: async (data) => {
    try {
      console.log(data);
      set({
        isLogginIn: true,
      });
      try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Login Successfully");
      } catch (error) {
        const messageError =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        toast.error(messageError);
      } finally {
        set({
          isLogginIn: false,
        });
      }
    } catch (error) {}
  },
  updateProfile: async (data) => {
    set({ isUpdateingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-prfile", data, {
        withCredentials: true,
      });
      set({ authUser: res.data.updateUser });
      set({ IsCheckingAuth: false });
      toast.success("Prfile updated successfully");
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      set({ isUpdateingProfile: false });
    }
  },
}));
