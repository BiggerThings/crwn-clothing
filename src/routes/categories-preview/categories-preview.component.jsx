import { selectCategoriesMap, selectIsCategoriesLoading } from "../../store/categories/category.selector";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component.jsx";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsCategoriesLoading);
  return (
    <>
      {isLoading ? <Spinner /> : <Fragment>
        {Object.keys(categoriesMap).map((title) => {
          const category = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={category} />
        })}
      </Fragment>}
    </>
  );
}

export default CategoriesPreview;