import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // 🚀 Fetch all users for sidebar
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      } else {
        toast.error(data.message || "Failed to load users");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 💬 Fetch messages for the selected user
  const getMessages = async (userId) => {
    if (!userId) return;
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error(data.message || "Failed to load messages");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✉️ Send a message to selected user
  const sendMessage = async (messageData) => {
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // 📡 Subscribe to socket messages
  const handleNewMessage = async (newMessage) => {
    if (!newMessage) return;

    // Message from the open chat → show instantly
    if (selectedUser && newMessage.senderId === selectedUser._id) {
      newMessage.seen = true;
      setMessages((prev) => [...prev, newMessage]);
      try {
        await axios.put(`/api/messages/mark/${newMessage._id}`);
      } catch {
        console.warn("Failed to mark message as seen");
      }
    } else {
      // Message from other users → increment unseen count
      setUnseenMessages((prev) => ({
        ...prev,
        [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1,
      }));
    }
  };

  const subscribeToMessages = () => {
    if (!socket) return;
    socket.off("newMessage"); // ✅ Prevent duplicate listeners
    socket.on("newMessage", handleNewMessage);
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage", handleNewMessage);
  };

  // 🧠 Manage subscriptions lifecycle
  useEffect(() => {
    if (!socket) return;
    subscribeToMessages();
    return unsubscribeFromMessages;
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    unseenMessages,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
