import { ProductContext } from "../../contexts/product.context";
import { useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss';

const Shop = () => {
    const { productList } = useContext(ProductContext);
  
    return (
    <div className="products-container">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export default Shop;