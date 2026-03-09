import type { JSX } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";

import type { Category, CategoryHavingSubCategory, SubCategory } from "@/types";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants";

import styles from "./BreadCrumb.module.scss";

type Props<T extends Category> = {
  category: Category;
  subCategory?: T extends CategoryHavingSubCategory
    ? SubCategory<T>
    : undefined;
  usage: "postDetail" | "create" | "edit"; 
};

const BreadCrumb = <T extends Category>({
  category,
  subCategory,
  usage
}: Props<T>): JSX.Element => {
  const subCategoryKr = SUB_CATEGORY_TO_KR_MAP[subCategory]

  return (
    <div className={styles["bread-crumb-component"]}>
      <Link to="/">
        <GoHome size={16} color="rgb(44, 44, 44)"/>
        홈
      </Link>
      <SlArrowRight size={11} color="rgb(44, 44, 44)" />
      <Link to={`/categories/${category}/posts`}>
        {category.toUpperCase()}
      </Link>
      {(subCategory || usage === "create" || usage === "edit") && (
        <SlArrowRight size={11} color="rgb(44, 44, 44)" />
      )}
      {usage === "postDetail" && subCategory && subCategoryKr}
      {usage === "create" && "글쓰기"}
      {usage === "edit" && "수정"}
    </div>
  );
};

export { BreadCrumb };