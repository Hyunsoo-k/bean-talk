import type { JSX } from "react";

import type { Category, CategoryHavingSubCategory, PostRequestBody } from "@/types";
import { extractPost_id } from "@/utils";
import { useGetPostDetail } from "@/hooks";
import { useLocation } from "react-router-dom";

import styles from "./PostEditPage.module.scss";
import { FormProvider, useForm, type SubmitErrorHandler } from "react-hook-form";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP } from "@/constants";
import { useEditPost } from "@/components/PostEditor/hooks/useEditPost";
import { useAlertModal } from "@/zustand";
import { BreadCrumb } from "@/components/ui";
import { PostEditor } from "@/components/PostEditor";

type Props = {
  category: Category;
};

const PostEditPage = ({ category }: Props): JSX.Element => {
  const { pathname } = useLocation();

  const post_id = extractPost_id(pathname);

  const {
    setIsOpen: setIsAlertModalOpen,
    setMessage,
    setHandleClick,
    resetStore,
  } = useAlertModal();

  const { isLoading, data: queryData } = useGetPostDetail(category, post_id);
  const { isPending, mutate: edit } = useEditPost(category, post_id);

  console.log(queryData);

  const formTools = useForm<PostRequestBody<typeof category>>({
    mode: "onSubmit",
    defaultValues: {
      title: queryData.title,
      content: queryData.content,
      ...(isCategoryHavingSubCategory(category)
        ? { subCategory: CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP[category as CategoryHavingSubCategory][0] } 
        : {}
      ),
    },
  });

  const submitHandler = (data: PostRequestBody<typeof category>) => {
    edit(data);
  };

  const submitError = (error: SubmitErrorHandler<PostRequestBody<typeof category>>) => {
    const firstErrorKey = Object.keys(error)[0];
    const firstError = error[firstErrorKey];
    const message = firstError?.message || "알 수 없는 오류가 발생하였습니다.";

    setIsAlertModalOpen(true);
    setMessage(message);
    setHandleClick(resetStore);
  };

  return (
    <FormProvider {...formTools}>
      <div className={styles["post-edit-page-component"]}>
        <BreadCrumb category={category} usage="edit" />
        <PostEditor
          category={category}
          isPending={isPending}
          submitHandler={submitHandler}
          submitError={submitError}
        />
      </div>
    </FormProvider>
  );
};

export { PostEditPage };