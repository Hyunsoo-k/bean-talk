import { useFormContext } from "react-hook-form";

import type { CategoryHavingSubCategory, SubCategory } from "@/types/category";
import { CATEGORY_TO_SUB_CATEGORIES_MAP, SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

import styles from "./SubCategorySelector.module.scss";

type Props = {
  category: CategoryHavingSubCategory;
  hasThumbnail: boolean;
};

const SubCategorySelector = ({ category, hasThumbnail }: Props) => {
  const { watch, setValue } = useFormContext();

  const subCategories = CATEGORY_TO_SUB_CATEGORIES_MAP[category];

  const handleClickSubCateogry = (subCategory: SubCategory<CategoryHavingSubCategory>) => {
    setValue("subCategory", subCategory);
  };

  return (
    <div className={`${styles["sub-category-selector"]} ${hasThumbnail ? styles["has-thumbnail"] : ""}`}>
      <span className={styles["classification"]}>
        분류
      </span>
      <div className={styles["boundary-line"]} />
      {subCategories.map((subCategory) => (
        <button
          type="button"
          key={subCategory}
          onClick={() => handleClickSubCateogry(subCategory)}
          className={`${styles["classification-button"]} ${
            watch("subCategory") === subCategory && styles["selected"]
          }`}
        >
          {SUB_CATEGORY_TO_KR_MAP[subCategory]}
        </button>
      ))}
    </div>
  );
};

export { SubCategorySelector };