import { useState, createContext, useEffect } from "react";
import SHOP_DATA from "../utils/shop-data.json";

export const ProductContext = createContext({
    productList : [],
    setProductList : () => null
})

export const ProductProvider = ({ children }) => {
    const [productList, setProductList] = useState(SHOP_DATA);
    const value = { productList, setProductList };

    useEffect(() => {
        setProductList(SHOP_DATA);
        console.log(SHOP_DATA);
    }, []);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}