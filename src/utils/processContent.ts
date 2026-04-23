import { uploadBlobUrl } from "@/api/uploadBlobUrl";

const processContent = async (textHTML: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(textHTML, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));
  const blobUrlImages = images.filter((image: HTMLImageElement) => {
    const src = image.getAttribute("src");
    return src?.startsWith("blob");
  });

  if (blobUrlImages.length === 0) {
    return doc.body.innerHTML;
  }

  const uploadedUrls = await Promise.all(
    blobUrlImages.map(img => {
      const src = img.getAttribute("src")!;
      return uploadBlobUrl(src)
    })
  );

  blobUrlImages.forEach((img, index) => {
    img.setAttribute("src", uploadedUrls[index]);
  });

  return doc.body.innerHTML
};

export { processContent };
