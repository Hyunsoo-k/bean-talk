const blobUrlToBlob = async (src: string) => {
  const response = await fetch(src);
  const blob = await response.blob();

  return blob;
};

export { blobUrlToBlob };