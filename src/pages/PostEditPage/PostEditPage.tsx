import type { JSX } from "react";
import type { SubmitErrorHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import type {
  Category,
  CategoryHavingSubCategory,
  PostRequestBody
} from "@/types";
import { extractPost_id, processHtml } from "@/utils";
import { useGetPostDetail } from "@/hooks";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP } from "@/constants";
import { useEditPost } from "@/components/PostEditor/hooks/useEditPost";
import { useAlertModalStore } from "@/zustand";
import { BreadCrumb } from "@/components/BreadCrumb";
import { PostEditor } from "@/components/PostEditor";
import { PostMetaForm } from "@/components/PostMetaForm";
import { JobDetailForm } from "@/components/PostEditor/components/JobDetailForm";

import styles from "./PostEditPage.module.scss";

type Props = {
  category: Category;
};

const PostEditPage = ({ category }: Props): JSX.Element => {
  const { pathname } = useLocation();

  const post_id = extractPost_id(pathname);

  const {
    open: openAlertModal,
    close: closeAlertModel
  } = useAlertModalStore();

  const { data: queryData } = useGetPostDetail(category, post_id);

  const {
    isPending: isEditing,
    mutate: edit
  } = useEditPost(category, post_id);

  const formTools = useForm<PostRequestBody<typeof category>>({
    mode: "onSubmit",
    defaultValues: {
      title: queryData?.title,
      content: queryData?.content,
      ...(isCategoryHavingSubCategory(category)
        ? {
          subCategory: CATEGORY_TO_SUB_CATEGORY_ENG_ARRAY_MAP[category as CategoryHavingSubCategory][0]
        } 
        : {}
      ),
      ...(category === "job"
        ? {
          employmentType: queryData?.employmentType,
          position: queryData?.position,
          payAmount: queryData?.payAmount,
          startTime: queryData?.startTime,
          endTime: queryData?.endTime,
        } : {}
      ),
      ...(queryData?.subCategory === "hiring"
        ? {
          address: queryData?.address,
          latitude: queryData?.latitude,
          longitude: queryData?.longitude,
        } : {}
      )
    },
  });

  const submitHandler = async (data: PostRequestBody<typeof category>) => {
    const { content } = data;
    const { processedContent, thumbnailUrl } = await processHtml(content);
    const requestBody = {
      ...data,
      content: processedContent,
      thumbnailUrl,
    };

    edit(requestBody);
  };

  const submitError = (error: SubmitErrorHandler<PostRequestBody<typeof category>>) => {
    const firstErrorKey = Object.keys(error)[0];
    const firstError = error[firstErrorKey];
    const message = firstError?.message || "알 수 없는 오류가 발생하였습니다.";

    openAlertModal(message, closeAlertModel);
  };

  return (
    <FormProvider {...formTools}>
      <div className={styles["post-edit-page-component"]}>
        <BreadCrumb category={category} usage="edit" />
        <form
          onSubmit={formTools.handleSubmit(submitHandler, submitError)}
          className={styles["form"]}
        >
          <PostMetaForm category={category} isPending={isEditing}/>
          {category === "job" && (
            <>
              <h2 className={styles["section-title"]}>
                {formTools.watch("subCategory") === "hiring"
                  ? "모집 정보"
                  : "지원 정보"
                }
              </h2>
              <JobDetailForm />
              <h2 className={styles["section-title"]}>
                상세 내용
              </h2>
            </>
          )}
          <PostEditor initialContent={queryData?.content} />
        </form>
      </div>
    </FormProvider>
  );
};

export { PostEditPage };