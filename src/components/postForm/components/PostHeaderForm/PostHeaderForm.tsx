import type { Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import type { Category } from "@/types/category";
import type { PostRequestBody } from "@/types/postRequestBody";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory"
import { SubCategorySelector } from "./components/SubCategorySelector/SubCategorySelector";;

import styles from "./PostHeaderForm.module.scss";

type Props = {
  category: Category;
};

const PostHeaderForm = ({ category }: Props) => {
  const { register, watch } = useFormContext();

  const hasSubCategories = isCategoryHavingSubCategory(category);

  return (
    <div
      className={`${styles["post-header-form-component"]} ${watch("thumbnailUrl") ? styles["has-thumbnail"] : ""} ${hasSubCategories ? styles["has-sub-categories"] : ""}`}
      style={{ backgroundImage: `${watch("thumbnailUrl") ? `url(${watch("thumbnailUrl")})`: ""}`}}
    >
      <div className={styles["title-input-wrapper"]}>
        <input
          placeholder="제목을 입력해 주세요."
          autoComplete="off"
          spellCheck={false}
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
          className={styles["title-input"]}
        />
      </div>
      {hasSubCategories && (<SubCategorySelector category={category} hasThumbnail={!!watch("thumbnailUrl")} />)}
    </div>
  );
};

export { PostHeaderForm };