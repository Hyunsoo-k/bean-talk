import type { JSX } from "react";
import { GoHome } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";

import styles from "./index.module.scss";
import { Link } from "react-router-dom";

type Props = {
  breadCrumbName: string;
  path: string;
  createOrEdit?: "create" | "edit"; 
};

const BreadCrumb = ({ breadCrumbName, path, createOrEdit }: Props): JSX.Element => {
  const isCreateOrEdit = createOrEdit;

  return (
    <div className={styles["bread-crumb-component"]}>
      <Link to="/">
        <GoHome size={16} color="rgb(44, 44, 44)"/>
        홈
      </Link>
      <SlArrowRight size={12} color="rgb(44, 44, 44)" />
      <Link to={path}>
        {breadCrumbName}
      </Link>
      {isCreateOrEdit && (
        <>
          <SlArrowRight size={12} color="rgb(44, 44, 44)" />
          {isCreateOrEdit === "create" ? "글쓰기" : "수정"}
        </>
      )}
    </div>
  );
};

export default BreadCrumb;