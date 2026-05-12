import type { UseMutateFunction } from "@tanstack/react-query";
import type { FieldError, FieldErrors } from "react-hook-form";
import { FormProvider, useForm, } from "react-hook-form";

import type { Category } from "@/types/category";
import type { Post } from "@/types/post";
import type { PostRequestBody } from "@/types/postRequestBody";
import { uploadBlobUrl } from "@/api/uploadBlobUrl";
import { getPostDefaultValues } from "./components/PostContentForm/utils/getDefaultValues";
import { processContent } from "@/utils/processContent";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { usePostEditor } from "@/hooks/usePostEditor";
import { PostHeaderForm } from "./components/PostHeaderForm/PostHeaderForm";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { PostContentForm } from "./components/PostContentForm/PostContentForm";
import { EditorFooter } from "../EditorFooter/EditorFooter";

import styles from "./PostForm.module.scss";
import { useFullPageSpinnerStore } from "@/zustand/useFullPageSpinnerStore";

type Props<T extends Category> = {
  category: T;
  initialData?: Post<T>;
  mutate: UseMutateFunction<void, Error, PostRequestBody<T>, unknown>;
  isPending: boolean;
};

const PostForm = <T extends Category>({
  category,
  initialData,
  mutate,
  isPending
}: Props<T>) => {
  const { open: openAlertModal, close: closeAlertModel } = useAlertModalStore(); 
  const { open: openFullPageSpinner } = useFullPageSpinnerStore();
  const methods = useForm<PostRequestBody<T>>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: getPostDefaultValues(category, initialData),
  });
  const { handleSubmit: handleRhfSubmit, setValue } = methods;
  const editor = usePostEditor(setValue, initialData?.content);

  const handleSubmit = async (data: PostRequestBody<T>) => {
    openFullPageSpinner();
    const { content, thumbnailUrl } = data;
    try {
      const processedThumbnail = thumbnailUrl
        ? await uploadBlobUrl(thumbnailUrl)
        : thumbnailUrl;
      const processedContent = await processContent(content);
      const requestBody: PostRequestBody<T> = {
        ...data,
        content: processedContent,
        thumbnailUrl: processedThumbnail
      };
      mutate(requestBody);
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : "알 수 없는 오류가 발생했습니다.";
      openAlertModal(message, closeAlertModel);
    }
  };

  const handleSubmitError = (erros: FieldErrors<PostRequestBody<T>>) => {
    const firstErrorKey = Object.keys(erros)[0] as keyof FieldErrors<PostRequestBody<T>>;
    const firstError = erros[firstErrorKey] as FieldError | undefined;
    const message = firstError?.message || "알 수 없는 오류가 발생하였습니다.";
    
    openAlertModal(message, closeAlertModel);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleRhfSubmit(handleSubmit, handleSubmitError)}
        className={styles["post-form-component"]}
      >
        <PostHeaderForm category={category} />
        <Toolbar editor={editor} />
        <PostContentForm editor={editor} />
        <EditorFooter isPending={isPending} />
      </form>
    </FormProvider>
  );
};

export { PostForm };