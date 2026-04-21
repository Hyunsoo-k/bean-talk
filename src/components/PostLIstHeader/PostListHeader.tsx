import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";

import type {
  Category,
  CategoryHavingSubCategory,
  SubCategory
} from "@/types/category";
import { CATEGORY_TO_SUB_CATEGORYS_MAP } from "@/constants/subCategoryMap";
import { useSearchModalStore } from "@/zustand/useSearchModalStore";
import { getUserMe } from "@/utils/getUserMe";
import { SubCategoryNav } from "./components/SubCategoryNav/SubCategoryNav";

import styles from "./PostListHeader.module.scss";

type Props = {
  category: Category;
};

const PostListHeader = ({ category }: Props) => {
  const { open: openSearchModal } = useSearchModalStore();
  const navigate = useNavigate();
  const [currentSubCategory, setCurrentSubCategory] =
    useState<SubCategory<CategoryHavingSubCategory> | "All">("All");
  
  const capitalizedCategory = category.toUpperCase();

  const userMe = getUserMe();

  let subCategories: (SubCategory<CategoryHavingSubCategory> | "All")[] = [];
  if (["promotion", "news", "job"].includes(category)) {
    subCategories = [...CATEGORY_TO_SUB_CATEGORYS_MAP[category as CategoryHavingSubCategory], "All"];
  }

  const handleSubCategoryClick = (
    subCategory: SubCategory<CategoryHavingSubCategory> | "All"
  ): void => {
    setCurrentSubCategory(subCategory);
  };

  const handleSearchClick = () => {
    openSearchModal({
      context: "postListPage",
      category: "promotion"
    });
  };

  const handleCreateClick = () => {
    navigate(`/categories/${category}/posts/create`);
  };

  return (
    <div className={styles["post-list-header-component"]}>
      <h2 className={styles["category"]}>
        {capitalizedCategory}
      </h2>
      {subCategories && (
        <SubCategoryNav
          category={category}
          currentSubCategory={currentSubCategory}
          subCategories={subCategories}
          onSubcategoryClick={handleSubCategoryClick}
        />
      )}
      <button
        type="button"
        onClick={handleSearchClick}
        className={`${styles["button"]} ${styles["search-button"]}`}
      >
        <CiSearch
          size={24}
          color="#2C2C2C"
          className={styles["search-icon"]}
        />
      </button>
      {userMe && (
        <button
          type="button"
          onClick={handleCreateClick}
          className={`${styles["button"]} ${styles["create-button"]}`}
        >
          <PiPencilSimpleLineLight
            size={24}
            color="#2C2C2C"
            className={styles["create-icon"]}
          />
        </button>
      )}
    </div>
  );
};

export { PostListHeader };