import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImage, setSeletecdImage] = React.useState(null);
  const navigate = useNavigate();
  const [name, setName] = React.useState(authUser.fullName);
  const [bio, setBio] = React.useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex flex-col gap-4 p-10 flex-1"
        >
          <h3 className="text-lg">Profile</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSeletecdImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jgp,jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImage && "rounded-full"}`}
            />
            Upload Profile image
          </label>

          <input
            type="text"
            required
            placeholder="Name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={4}
            required
            placeholder="Bio"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
          >
            Save
          </button>
        </form>
        <img
          className={`max-w-44 aspect-square rounded-full mx-20 max-sm:mt-10 ${
            selectedImage && "rounded-full"
          }`}
          src={authUser?.profilePic || assets.avatar_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;
