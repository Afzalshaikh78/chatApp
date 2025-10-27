import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);
  if (!selectedUser) return null;

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* Profile Section */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex items-center gap-2 mt-2">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
            <h1 className="text-xl font-medium">{selectedUser.fullName}</h1>
          </div>

          <p className="px-10 text-center text-gray-300">
            {selectedUser.bio || "No bio available"}
          </p>
        </div>

        <hr className="border-gray-700 my-4 mx-5" />

        {/* Media Section */}
        <div className="px-5 text-xs">
          <p className="font-medium mb-2">Media</p>
          <div className="max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-3 opacity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url, "_blank")}
                className="cursor-pointer rounded-md overflow-hidden hover:opacity-90 transition"
              >
                <img src={url} alt="media" className=" h-full  rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
