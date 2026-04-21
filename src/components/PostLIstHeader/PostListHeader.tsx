import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

import type { Category } from "@/types/category";
import { isCategoryHavingSubCategory } from "@/utils/isCategoryHavingSubCategory";
import { useGetUserMe } from "@/hooks/useGetUserMe";
import { SubCategoryNav } from "./components/SubCategoryNav/SubCategoryNav";
import { SearchForm } from "../SearchForm/SearchForm";

import styles from "./PostListHeader.module.scss";

type Props = {
  category: Category;
};

const PostListHeader = ({ category }: Props) => {
  const navigate = useNavigate();
  const [isSearchFormOpen, setIsSerachFormOpen] = useState<boolean>(false);
  const { data: userMe } = useGetUserMe();
  const capitalizedCategory = category.toUpperCase();
  const hasSubCategory = isCategoryHavingSubCategory(category);

  const handleSearchClick = () => {
    setIsSerachFormOpen(true);
  };

  const handleCloseClick = () => {
    setIsSerachFormOpen(false);
  };

  const handleCreateClick = () => {
    navigate(`/categories/${category}/posts/create`);
  };

  return (
    <div className={styles["post-list-header-component"]}>
      <h2 className={styles["category"]}>
        {capitalizedCategory}
      </h2>
      {hasSubCategory && (
        <SubCategoryNav category={category} isSearchFormOpen={isSearchFormOpen} />
      )}
      <div className={styles["button-group"]}>
        {userMe && !isSearchFormOpen && (
          <button
            type="button"
            onClick={handleCreateClick}
            className={`${styles["button"]} ${styles["create-button"]}`}
          >
            <PiPencilSimpleLineLight className={styles["button-icon"]} />
          </button>
        )}
        {isSearchFormOpen ? (
          <button
            type="button"
            onClick={handleCloseClick}
            className={styles["button"]}
          >
            <IoCloseOutline className={styles["button-icon"]}/>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSearchClick}
            className={styles["button"]}
          >
            <CiSearch className={styles["button-icon"]}/>
          </button>
        )}
        {isSearchFormOpen && (
          <SearchForm setIsSearchFormOpen={setIsSerachFormOpen} context="postListHeader" />
        )}
      </div>
    </div>
  );
};

export { PostListHeader };