import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLaoding: false,
  

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res?.data?.users });
      console.log(JSON.stringify(res.data, null, 2))
      res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLaoding: true });
    try {
      const res = await axiosInstance.get(`/messages?${userId}`);
      set({ messages: res?.data });
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error getting messages");
    } finally {
      set({ isMessagesLaoding: false });
    }
  },
  setSelectedUser: (selectedUser) => set({selectedUser}),
}));
