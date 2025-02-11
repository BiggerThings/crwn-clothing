import { useState, createContext, useEffect } from "react";
import  SHOP_DATA  from "../utils/shop-data.js";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductContext = createContext({
    productList : [],
    setProductList : () => null
})

export const ProductProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        // let productData = SHOP_DATA;
        // addCollectionAndDocuments('categories',productData);
        // //ssetProductList([...SHOP_DATA[0].items, ...SHOP_DATA[1].items]);
        // console.log("DONe to add data");
    }, []);

    const value = { productList  };

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}