import axios from "axios";

import { blobUrlToBlob } from "@/utils/blobUrlToBlob";
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const PRESET_NAME = import.meta.env.VITE_PRESET_NAME

const uploadBlobUrl = async (src: string) => {
  const isBlobUrl = src.startsWith("blob");
  if (!isBlobUrl) {
    return src;
  }
  const blob = await blobUrlToBlob(src);

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", PRESET_NAME);
  
  const { data } = await axios.post(CLOUDINARY_URL, formData);
  const uploadedUrl = data.secure_url;
  return uploadedUrl;
};

export { uploadBlobUrl };