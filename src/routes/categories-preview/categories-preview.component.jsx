import { CategoriesContext } from "../../contexts/categories.context";
import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
  
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