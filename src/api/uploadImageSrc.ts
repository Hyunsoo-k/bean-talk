import axios from "axios";

import { base64ToBlob, blobUrlToBlob } from "@/utils";

const uploadImageSrc = async (src: string) => {
  let blob: Blob | undefined;

  const isBase64Src = src.startsWith("data") && src.includes("base64");
  if (isBase64Src) {
    blob = base64ToBlob(src);
  } else {
    blob = await blobUrlToBlob(src);
  }

  if (!blob) {
    return;
  }

  const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
  const PRESET_NAME = import.meta.env.VITE_PRESET_NAME

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", PRESET_NAME);

  const { data } = await axios.post(CLOUDINARY_URL, formData);

  const uploadedUrl = data.secure_url;
  
  return uploadedUrl;
};

export { uploadImageSrc };