import type { RefObject } from "react";

const handleResizeTextArea = (textAreaRef: RefObject<HTMLTextAreaElement | null>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 15}px`;
    }
  };

export { handleResizeTextArea };