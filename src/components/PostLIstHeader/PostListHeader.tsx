import type { JSX } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiPencilSimpleLineLight } from "react-icons/pi";

import type { Category, SubCategoryKr } from "@/types";
import { useGetUserMe } from "@/hooks";

import styles from "./PostListHeader.module.scss";

type Props = {
  category: Category;
};

const PostListHeader = ({ category }: Props): JSX.Element => {
  const navigate = useNavigate();
  
  const [currentSubCategory, setCurrentSubCategory] = useState<SubCategoryKr>("All");
  
  const capitalizedCategory = category.toUpperCase();

  const subCategorys: SubCategoryKr[] = [];

  switch (category) {
    case "promotion":
      subCategorys.push(...["카페", "납품", "All"] as SubCategoryKr[]);
      break;
    case "job":
      subCategorys.push(...["구인", "구직", "All"] as SubCategoryKr[]);
      break;
    case "news":
      subCategorys.push(...["국내", "해외", "All"] as SubCategoryKr[]);
      break;
  }

  const handleClickSubCategory = (subCategory: SubCategoryKr): void => {
    setCurrentSubCategory(subCategory);
  };

  const userMe = useGetUserMe();

  const handleClickCreate = () => {
    navigate(`/categories/${category}/posts/create`);
  };

  return (
    <div className={styles["post-list-header-component"]}>
      <h2 className={styles["category"]}>
        {capitalizedCategory}
      </h2>
      <ul className={styles["sub-category-list"]}>
        {subCategorys.map((subCategory: SubCategoryKr) => (
          <li
            key={subCategory}
            onClick={() => { handleClickSubCategory(subCategory); }}
            className={styles["sub-category-item"]}
          >
            <Link
              to=""
              className={`${styles["sub-category-link"]} ${currentSubCategory === subCategory ? styles["active"] : ""}`}
            >
              {subCategory}
            </Link>
          </li>
        ))}
      </ul>
      <CiSearch
        size={24}
        color="#2C2C2C"
        className={styles["search-icon"]}
      />
      {userMe && (
        <PiPencilSimpleLineLight
          size={24}
          color="#2C2C2C"
          onClick={handleClickCreate}
          className={styles["create-icon"]}
        />
      )}
    </div>
  );
};

export { PostListHeader };