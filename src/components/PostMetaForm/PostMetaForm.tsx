import type { Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import type { Category } from "@/types/category";
import type { CategoryHavingSubCategory } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import type { SubCategoryKr } from "@/types/category";
import { CATEGORY_TO_SUB_CATEGORY_KR_ARRAY_MAP } from "@/constants/subCategoryMap";
import { SUB_CATEGORY_TO_ENG_MAP } from "@/constants/subCategoryMap";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";

import defaultProfile from "@/assets/default-images/default-profile.jpg";
import styles from "./PostMetaForm.module.scss";

type Props = {
  category: Category;
  isPending: boolean;
};

const PostMetaForm = ({ category, isPending }: Props) => {
  const { register, watch, setValue } = useFormContext();

  const subCategoriesKr = isCategoryHavingSubCategory(category)
    ? CATEGORY_TO_SUB_CATEGORY_KR_ARRAY_MAP[category as CategoryHavingSubCategory]
    : null

  const handleClickSubCateogry = (subCategory: SubCategoryKr<CategoryHavingSubCategory>) => {
    setValue("subCategory", SUB_CATEGORY_TO_ENG_MAP[subCategory]);
  };

  return (
    <div className={styles["post-editor-header-component"]}>
      <input
        placeholder="제목을 입력해 주세요."
        autoComplete="off"
        {...register(
          "title" as Path<PostRequestBody<typeof category>>,
          {
            validate: (value: string) => {
              return value.length < 2 || value.length > 40
                ? "제목은 2자 이상, 40자 미만으로 작성해야 합니다."
                : true
            }
          }
        )}
        className={styles["title"]}
      />
      <div className={styles["control-bar"]}>
        <div
          className={styles["profile-image"]}
          style={{ backgroundImage: `url(${defaultProfile})` }}
        />
        <span className={styles["nickname"]}>
          운영자
        </span>
        {subCategoriesKr && (
          <>
            <span className={styles["classification"]}>
              분류
            </span>
            <div className={styles["boundary-line"]} />
            {subCategoriesKr.map((subCategory: SubCategoryKr<CategoryHavingSubCategory>) => (
              <button
                type="button"
                key={subCategory}
                onClick={() => handleClickSubCateogry(subCategory)}
                className={`${styles["sub-category"]} ${
                  watch("subCategory") === SUB_CATEGORY_TO_ENG_MAP[subCategory] && styles["selected"]
                }`}
              >
                {subCategory}
              </button>
            ))}
          </>
        )}
        <div className={styles["data-control-box-box"]}>
          <button type="button" className={styles["cancel-button"]}>
            취소
          </button>
          <button
            disabled={isPending}
            className={styles["submit-button"]}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export { PostMetaForm };