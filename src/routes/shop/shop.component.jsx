import { CategoriesContext } from "../../contexts/categories.context";
import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
  
    return (
      <div className="shop-container">
        {Object.keys(categoriesMap).map((title) => { 
          const category = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={category} />
        })}
      </div>
    );
}

export default Shop;