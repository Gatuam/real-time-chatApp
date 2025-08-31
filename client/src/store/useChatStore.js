import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res?.data?.users });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/chat/${userId}`);
      set({ messages: res?.data || [] });
      console.log(res.data);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error getting messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/chat/send/${selectedUser?.id}`,
        messageData
      );

      if (!res.data.success) {
        toast.error(res.data.message || "Server error");
        return;
      }
      set({ messages: [...(messages || []), res.data.newMessage] });

      console.log(messages);
    } catch (error) {
      console.error("Axios error:", error);
      toast.error(error?.response?.data?.message || "Server/network error");
    }
  },
  subcribeMessages: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();
    if (!selectedUser) return;

    socket.off("newMessage");
    socket.on("newMessage", (messages) => {
      if (messages.senderId !== selectedUser.id) return;
      set({ messages: [...get().messages, messages] });
    });
  },
  unsubMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (user) => {
    get().unsubMessages(); // remove old listener
    set({ selectedUser: user });
    get().subcribeMessages(); // subscribe for new user
  },
}));
