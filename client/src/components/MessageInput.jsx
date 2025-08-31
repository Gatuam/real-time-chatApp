import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { RxCross2 } from "react-icons/rx";
import { CiImageOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imgaePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();
  const handleImageSelected = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please selecte an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };
  const handleImageRemove = () => {
    setImagePreview(null);
  };
  const handleMessageSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imgaePreview) return;
    try {
      setLoading(true);
      await sendMessages({
        text: text.trim(),
        image: imgaePreview || null,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Error while send message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" p-3 w-full">
      {imgaePreview && (
        <div className=" mb-3 items-center gap-2">
          <div className="relative">
            <img
              src={imgaePreview}
              alt="img"
              className=" w-20 h-20 object-cover rounded-lg border border-accent/10 p-2 shadow-xl"
            />
            <button
              onClick={handleImageRemove}
              className=" absolute -top-1.5 left-16 w-5 h-5 bg-base-300 cursor-pointer rounded-full flex items-center justify-center shadow-2xl"
              type="button"
            >
              <RxCross2 />
            </button>
          </div>
        </div>
      )}
      <form className=" flex items-center gap-2" onSubmit={handleMessageSend}>
        <div className=" flex-1 flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hello"
            className=" w-full input input-bordered rounded-lg input-sm sm:input-md border"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelected}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
        ${imgaePreview ? "text-emerald-500" : "text-zinc-400"}
        `}
            onClick={() => fileInputRef.current?.click()}
          >
            <CiImageOn />
          </button>
        </div>
        {
          <button
            type="submit"
            className=" btn btn-sm btn-circle cursor-pointer"
            disabled={(!text.trim() && !imgaePreview) || loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <BsSend />
            )}
          </button>
        }
        {loading &&
          imgaePreview &&
          toast.success("Image is sending please wait")}
      </form>
    </div>
  );
};

export default MessageInput;
