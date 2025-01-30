import { ProductContext } from "../../contexts/product.context";
import { useContext } from "react";


const Shop = () => {
    const { productList } = useContext(ProductContext);
  
    return (
    <div>
        {productList.map(({name, id}) => (
        <div key={id}>
            <h1>{name}</h1>
        </div>
    ))}
    </div>
  );
}

export default Shop;