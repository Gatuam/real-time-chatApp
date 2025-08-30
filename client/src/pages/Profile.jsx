import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { authUser, isUpdateingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        console.log("Uploading...");
        const res = await updateProfile({ profilePicture: base64Image });
        console.log("Upload successful", res);
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed! Check the console for details.");
      }
    };
  };

  return (
    <div
      className="w-full  flex justify-center items-center pt-10
    "
    >
      <div
        style={{
          backgroundImage: `radial-gradient(circle at 0.5px 0.4px, rgba(6,182,212,0.15) 1px, transparent 0)`,
          backgroundSize: "8px 8px",
          backgroundRepeat: "repeat",
        }}
        className="main-con max-w-lg min-w-md mx-auto border border-[#07eba709] rounded-xl bg-[#191a192a] shadow-md flex flex-col items-center px-2 py-8
       "
      >
        <div className="flex flex-col items-center border border-[#0afff31f] rounded-xl px-6 pt-9 pb-10 bg-base-100">
          <h1 className="text-2xl font-semibold text-neutral-100 ">Profile</h1>
          <p className="mt-2 text-sm tracking-wider text-neutral-200">
            Your profile information
          </p>
          <div className=" flex flex-col justify-center items-center p-7 ">
            <div className="relative mb-3">
              <img
                src={
                  authUser?.profilePicture ||
                  "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                }
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-[#9b9b9b] shadow-2xs "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 
                  ${
                    isUpdateingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  name="profile"
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdateingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-500">
              {isUpdateingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-between items-center">
            <form className="flex flex-col gap-3 w-80 mt-4 justify-center items-center">
              <input
                value={authUser?.username || ""}
                type="text"
                readOnly
                placeholder="username"
                className="input input-neutral focus:outline-none focus:ring-0 border border-[#0dffeb18]"
              />
              <input
                value={authUser?.email || ""}
                type="email"
                readOnly
                placeholder="email"
                className="input input-neutral focus:outline-none focus:ring-0 border border-[#0dffeb18]"
              />
            </form>
          </div>
        </div>
        <div className="mt-8 border border-[#01ffff25] shadow-sm rounded-xl p-6 min-w-sm bg-base-100">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
