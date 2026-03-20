import type { FieldErrors } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";

import type { Category } from "@/types/category";
import type { CategoryHavingSubCategory } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { CATEGORY_TO_SUB_CATEGORYS_MAP } from "@/constants/subCategoryMap";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { processHtml } from "@/utils/processHtml";
import { useAlertModalStore } from "@/zustand/useAlertModalStore";
import { useCreatePost } from "@/components/PostEditor/hooks/useCreatePost";
import { BreadCrumb } from "@/components/BreadCrumb/BreadCrumb";
import { PostMetaForm } from "@/components/PostMetaForm/PostMetaForm";
import { JobDetailForm } from "@/components/PostEditor/components/JobDetailForm/JobDetailForm";
import { PostEditor } from "@/components/PostEditor/PostEditor";

import styles from "./PostCreatePage.module.scss";

type Props = {
  category: Category;
};

const PostCreatePage = ({ category }: Props) => {
  const {
    open: openAlertModal,
    close: closeAlertModel
  } = useAlertModalStore();

  const formTools = useForm<PostRequestBody<typeof category>>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      ...(isCategoryHavingSubCategory(category)
        ? { subCategory: CATEGORY_TO_SUB_CATEGORYS_MAP[category as CategoryHavingSubCategory][0] } 
        : {}
      ),
      ...(category === "job"
        ? {
          employmentType: "partTime",
          position: "barista",
          payAmount: null,
          startTime: "00:00",
          endTime: "00:00",
          address: null,
          latitude: 37.5665,
          longitude: 126.9780
        }
        : {}
      )
    },
  });

  const { isPending, mutate: create } = useCreatePost(category);

  const submitHandler = async (data: PostRequestBody<typeof category>) => {
    const { content } = data;

    const { processedContent, thumbnailUrl } = await processHtml(content);
    const requestBody = {
      ...data,
      content: processedContent,
      thumbnailUrl,
    };
    
    create(requestBody);
  };

  const submitError = (error: FieldErrors<PostRequestBody<typeof category>>) => {
    const firstErrorKey = Object.keys(error)[0];
    const firstError = error[firstErrorKey];
    const message = firstError?.message || "알 수 없는 오류가 발생하였습니다.";

    openAlertModal(message, closeAlertModel);
  };

  return (
    <FormProvider {...formTools}>
      <div className={styles["post-create-page-component"]}>
        <BreadCrumb category={category} usage="create" />
        <form
          onSubmit={formTools.handleSubmit(submitHandler, submitError)}
          className={styles["form"]}
        >
          <PostMetaForm category={category} isPending={isPending}/>
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
          <PostEditor />
        </form>
      </div>
    </FormProvider>
  );
};

export { PostCreatePage };