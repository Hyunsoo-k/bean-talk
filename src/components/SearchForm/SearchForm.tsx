import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./SearchForm.module.scss";

type Props = {
  setIsSearchFormOpen: Dispatch<SetStateAction<boolean>>;
  context: "header" | "postListHeader";
};

type FormValues = {
  "query": string;
};

const SearchForm = ({ setIsSearchFormOpen, context }: Props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLocationKey = useRef(location.key);
  const navigate = useNavigate();
  const { register, handleSubmit: handleRHFSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (initialLocationKey.current === location.key) {
      return;
    }

    setIsSearchFormOpen(false);
  }, [location, setIsSearchFormOpen])

  const handleSubmit = (value: FormValues) => {
    const { query } = value;

    if (context === "header") {
      navigate(`/integrated-search?query=${query}`);
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        "query": query
      });
    }
  };

  return (
    <form
      onSubmit={handleRHFSubmit(handleSubmit)}
      className={`${styles["search-form-component"]} ${context === "postListHeader" && styles["in-post-list-header"]}`}
    >
      <input
        placeholder="검색어를 입력해 주세요."
        spellCheck={false}
        autoComplete="off"
        {...register("query", {
          required: true,
          minLength: {
            value: 2,
            message: "2자 이상 입력해 주세요."
          }
        })}
        className={styles["input"]}
      />
      <button className={styles["submit-button"]} />
    </form>
  );
};

export { SearchForm };