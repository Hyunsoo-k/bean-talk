import { useRef } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./EditorFooter.module.scss";

type Props = {
  isPending: boolean;
};

const EditorFooter = ({ isPending }: Props) => {
  const { watch, setValue } = useFormContext();
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      const previewUrl = URL.createObjectURL(selectedFile);

      setValue("thumbnailUrl", previewUrl); 
    }
  };

  const handleinsertButtonClick = () => {
    if (watch("thumbnailUrl")) {
      setValue("thumbnailUrl", null)
    } else {
      thumbnailInputRef.current?.click();
    }
  };

  return (
    <footer className={styles["editor-footer-component"]}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={thumbnailInputRef}
        className={styles["thumbnail-input"]}
      />
      <button
        type="button"
        onClick={handleinsertButtonClick}
        className={`${styles["button"]} ${styles["thumbnail-action"]}`}
      >
        {watch("thumbnailUrl") ? "대표이미지 삭제" : "대표이미지 추가"}
      </button>
      <button disabled={isPending} className={`${styles["button"]} ${styles["submit"]}`}>
        등록
      </button>
    </footer>
  );
};

export { EditorFooter };