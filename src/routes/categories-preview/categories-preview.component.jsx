import { selectCategoriesMap } from "../../store/categories/category.selector";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const category = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={category} />
      })}
    </Fragment>
  );
}

export default CategoriesPreview;