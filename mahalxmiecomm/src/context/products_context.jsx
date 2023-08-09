import { createContext,useState } from "react";
import PRODUCTS from '../shop-data.json';
//createContext returns an object


export const ProductsContext=createContext({
    products:[],
});

export const ProductProvider=({children})=>{
  const {products,setproducts}=useState(PRODUCTS);
  const value={products};
  return(
    <ProductsContext.Provider value={value}> {children}</ProductsContext.Provider>
  );
};

