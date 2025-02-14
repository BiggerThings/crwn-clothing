import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        if (categoriesMap[category]) {
            setProducts(categoriesMap[category]);
        }
    }, [categoriesMap, category]);

    return (
        <div  className="category-container">
            {products &&
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default Category;