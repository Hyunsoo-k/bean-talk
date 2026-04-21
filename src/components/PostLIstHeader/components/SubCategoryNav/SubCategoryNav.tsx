import { Link, useSearchParams, createSearchParams  } from "react-router-dom";

import type { CategoryHavingSubCategory, SubCategory } from "@/types/category";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { CATEGORY_TO_SUB_CATEGORIES_MAP, SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

import styles from "./SubCategoryNav.module.scss";

type Props = {
  category: CategoryHavingSubCategory;
  isSearchFormOpen: boolean;
};

const SubCategoryNav = ({ category, isSearchFormOpen }: Props) => {
  const [searchParams] = useSearchParams();
  const currentSubCategory = searchParams.get("sub-category");
  let subCategories: (SubCategory<typeof category> | "All")[] = [];
  if (isCategoryHavingSubCategory(category)) {
    subCategories = [...CATEGORY_TO_SUB_CATEGORIES_MAP[category], "All"];
  }

  return (
    <ul
      className={`${styles["sub-category-nav-component"]} ${isSearchFormOpen && styles["search-form-open"]}`}
    >
      {subCategories.map((subCategory: SubCategory<typeof category> | "All") => (
        <li key={subCategory} className={styles["sub-category-wrapper"]}>
          <Link
            to={{
              pathname: `/categories/${category}/posts`,
              search: createSearchParams({
                ...Object.fromEntries(searchParams),
                "sub-category": subCategory.toLowerCase(),
              }).toString(),
            }}
            className={`${styles["sub-category"]} ${(currentSubCategory === subCategory) || (currentSubCategory === "all" && subCategory === "All") || (!currentSubCategory && subCategory === "All") ? styles["active"] : ""}`}
          >
            {SUB_CATEGORY_TO_KR_MAP[subCategory as SubCategory<typeof category>] || "All"}
          </Link>
        </li>
      ))}
    </ul>
  )
};

export { SubCategoryNav };
