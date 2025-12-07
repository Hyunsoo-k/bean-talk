// import { useEffect, useState } from "react";

// import type { Category, SubCategoryKr } from "@/types";
// import { CATEGORY_TO_SUB_CATEGORY_ARRAY_MAP } from "@/constants";

// const useSubCategory = <T extends Category>(category: T) => {
//   const [currentSubCategory, setCurrentSubCategory] = 
//     useState<SubCategoryKr<T> | null>(null);

//   const subCategories = CATEGORY_TO_SUB_CATEGORY_ARRAY_MAP[category];

//   useEffect(() => {
//     if (subCategories) {
//       setCurrentSubCategory(subCategories[0]);
//     }
//   }, [subCategories]);

//   return { currentSubCategory, setCurrentSubCategory, subCategories };
// };

// export { useSubCategory };