import type { JSX } from "react";
import type { SubmitErrorHandler } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";

import type {
  Category,
  CategoryHavingSubCategory,
  PostRequestBody
} from "@/types";
import { CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP } from "@/constants";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { useAlertModal } from "@/zustand";
import { useCreatePost } from "@/components/PostEditor/hooks/useCreatePost";
import { BreadCrumb } from "@/components/ui";
import { PostEditor } from "@/components/PostEditor";

import styles from "./PostCreatePage.module.scss";

type Props = {
  category: Category;
};

const PostCreatePage = ({ category }: Props): JSX.Element => {
  const {
    open: openAlertModal,
    close: closeAlertModel
  } = useAlertModal();

  const formTools = useForm<PostRequestBody<typeof category>>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      content: "",
      ...(isCategoryHavingSubCategory(category)
        ? { subCategory: CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP[category as CategoryHavingSubCategory][0] } 
        : {}
      ),
    },
  });

  const { isPending, mutate: create } = useCreatePost(category);

  const submitHandler = (data: PostRequestBody<typeof category>) => {
    create(data);
  };

  const submitError = (error: SubmitErrorHandler<PostRequestBody<typeof category>>) => {
    const firstErrorKey = Object.keys(error)[0];
    const firstError = error[firstErrorKey];
    const message = firstError?.message || "알 수 없는 오류가 발생하였습니다.";

    openAlertModal(message, closeAlertModel);
  };

  return (
    <FormProvider {...formTools}>
      <div className={styles["post-create-page-component"]}>
        <BreadCrumb category={category} usage="create" />
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

export { PostCreatePage };