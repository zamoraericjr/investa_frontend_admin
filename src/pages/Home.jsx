import {useState, useEffect } from "react";

import Product from "../components/Product";
import productService from "../services/productService";
import AddProduct from "../components/AddProduct";
import selService from "../services/selService";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts().then((res) => {
      setProducts(res);

    });

    selService.deleteSelected();
  }, []);

  return (

    <div>
      <div className="table w-full fixed top-0 left-0 right-0 ml-0 mr-0 bg-teal-900 shadow-lg">
        <div className="m-1 mb-2">
          <h3>Investa</h3>
          <AddProduct
          products = {products}
          setProducts = {setProducts}
          />
        </div>      
      </div>

      <div className="mt-20">
      {products.map((prod) => (
      <Product
      key = {Math.random()*1000}
      keyProd = {prod.key}
        prodName = {prod.name}
        stat = {prod.stat}
        products = {products}
        setProducts = {setProducts}
        prodId = {prod.id}
        profits = {prod.profits}
        growth = {prod.growth}
        date = {prod.date}

      />))}   

      </div>
  
   
    </div>
  );
}

export default Home;