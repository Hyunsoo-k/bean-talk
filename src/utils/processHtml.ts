import { uploadImageSrc } from "@/api/uploadImageSrc";

const processHtml = async (textHTML: string) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(textHTML, "text/html");
  const images = Array.from(document.querySelectorAll("img"));
  const base64Images = images.filter((image: HTMLImageElement) => {
    const src = image.getAttribute("src");

    return src?.includes(";base64,");
  });

  if (base64Images.length === 0) {
    return {
      processedContent: document.body.innerHTML,
      thumbnailUrl: images[0]?.getAttribute("src") ?? null,
    };
  }

  const uploadedUrls = await Promise.all(
    base64Images.map(img => {
      const src = img.getAttribute("src")!;

      return uploadImageSrc(src)
    })
  );

  base64Images.forEach((img, index) => {
    img.setAttribute("src", uploadedUrls[index]);
  });

  return {
    processedContent: document.body.innerHTML,
    thumbnailUrl: uploadedUrls[0] ?? null,
  };
};

export { processHtml };
