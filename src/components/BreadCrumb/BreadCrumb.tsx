import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";

import type { Category, CategoryHavingSubCategory } from "@/types/category";
import type { SubCategory } from "@/types/category";
import { SUB_CATEGORY_TO_KR_MAP } from "@/constants/subCategoryMap";

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
  usage,
}: Props<T>) => {
  const subCategoryKr = SUB_CATEGORY_TO_KR_MAP[subCategory as SubCategory<CategoryHavingSubCategory>]

  return (
    <div className={styles["bread-crumb-component"]}>
      <Link to="/" className={styles["link"]}>
        <GoHome className={`${styles["icon"]} ${styles["home"]}`} />
        홈
      </Link>
      <SlArrowRight className={`${styles["icon"]} ${styles["arrow"]}`}/>
      <Link to={`/categories/${category}/posts`} className={styles["link"]}>
        {category.toUpperCase()}
      </Link>
      {(subCategory || usage === "create" || usage === "edit") && (
        <SlArrowRight className={`${styles["icon"]} ${styles["arrow"]}`} />
      )}
      <span className={styles["path"]}>
        {usage === "postDetail" && subCategory && subCategoryKr}
        {usage === "create" && "글쓰기"}
        {usage === "edit" && "수정"}
      </span>
    </div>
  );
};

export { BreadCrumb };