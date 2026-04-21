import type { UseMutateFunction } from "@tanstack/react-query";
import type { FieldErrors } from "react-hook-form";
import { FormProvider, useForm, } from "react-hook-form";

import type { Category, CategoryHavingSubCategory } from "@/types/category";
import type { Post } from "@/types/post";
import type { PostRequestBody } from "@/types/postRequestBody";
import { CATEGORY_TO_SUB_CATEGORIES_MAP } from "@/constants/subCategoryMap";
import { uploadBlobUrl } from "@/api/uploadBlobUrl";
import { processContent } from "@/utils/processContent";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { usePostEditor } from "@/hooks/usePostEditor";
import { PostHeaderForm } from "./components/PostHeaderForm/PostHeaderForm";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { PostContentForm } from "./components/PostContentForm/PostContentForm";
import { EditorFooter } from "../EditorFooter/EditorFooter";

import styles from "./PostForm.module.scss";

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
  const methods = useForm<PostRequestBody<T>>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      thumbnailUrl: initialData?.thumbnailUrl ?? "",
      title: initialData?.title ?? "",
      content: initialData?.content ?? "",
      ...(isCategoryHavingSubCategory(category)
        ? { subCategory: initialData?.subCategory ?? CATEGORY_TO_SUB_CATEGORIES_MAP[category as CategoryHavingSubCategory][0] } 
        : {}
      ),
    },
  });
  const { handleSubmit: handleRhfSubmit, setValue, watch } = methods;
  const editor = usePostEditor(setValue, watch("content"));

  const handleSubmit = async (data: PostRequestBody<T>) => {
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
      openAlertModal(error.message, closeAlertModel);
    }
  };

  const handleSubmitError = (error: FieldErrors<PostRequestBody<T>>) => {
    const firstErrorKey = Object.keys(error)[0] as keyof FieldErrors<PostRequestBody<T>>;
    const firstError = error[firstErrorKey];
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