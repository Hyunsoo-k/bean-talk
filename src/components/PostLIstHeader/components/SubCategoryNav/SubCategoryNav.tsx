import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types/category";
import { Link } from "react-router-dom";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

import styles from "./SubCategoryNav.module.scss";

type Props = {
  category: Category;
  currentSubCategory: SubCategory<CategoryHavingSubCategory> | "All"
  subCategories: (SubCategory<CategoryHavingSubCategory> | "All")[];
  onSubcategoryClick: (subCategory: SubCategory<CategoryHavingSubCategory> | "All") => void;
};

const SubCategoryNav = ({
  category,
  currentSubCategory,
  subCategories,
  onSubcategoryClick
}: Props) => {
  return (
    <ul className={styles["sub-category-nav-component"]}>
      {subCategories.map((subCategory: SubCategory<CategoryHavingSubCategory> | "All") => (
        <li
          key={subCategory}
          onClick={() => { onSubcategoryClick(subCategory); }}
          className={styles["sub-category-wrapper"]}
        >
          <Link
            to={`/categories/${category}/posts?sub-category=${subCategory}`}
            className={`${styles["sub-category"]} ${currentSubCategory === subCategory ? styles["active"] : ""}`}
          >
            {SUB_CATEGORY_TO_KR_MAP[subCategory as SubCategory<CategoryHavingSubCategory>] || "All"}
          </Link>
        </li>
      ))}
    </ul>
  )
};

export { SubCategoryNav };