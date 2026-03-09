const base64ToBlob = (src: string): Blob => {
  const [meta, base64String] = src.split(",");

  const mime = meta.match(/data:(.*);base64/)?.[1];
  if (!mime) {
    throw new Error("Invalid base64 image");
  }

  const binary = atob(base64String);
  const len = binary.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
};

export { base64ToBlob };