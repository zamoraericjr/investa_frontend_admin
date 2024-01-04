import React, { useEffect, useState } from 'react'
import productService from '../services/productService';
import { FaCirclePlus } from 'react-icons/fa6';

function AddProduct({products, setProducts}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
      // productService.getProducts().then((res) => {
      //   setProducts(res);
  
      // });
    }, []);
  
    const newProduct = (e) => {
      e.preventDefault();

      if(name.length <= 2){
        setError("Enter valid name")
          return;
      }
    

      productService.getProducts().then((res) => {
        if(res==''){
          const key = 1;
          addProduct(key);

  
        }
        else{
          const maxKey = res.reduce((max, obj) => (obj.key > max ? obj.key : max), res[0].key);
        const key = maxKey+1;
        addProduct(key);

        }
  
      })
    }
  
    function addProduct(key){

     const stat = 0;
     const growth = 0;
     const profits = [];
     
     let today = new Date();
     let year = today.getFullYear();
     let mnth = today.getMonth()+1;
     let day = today.getDate();
     const date = mnth+"-"+day+"-"+year;

          const newProd = {
            stat,
              key,
              name,
              growth,
              profits,
              date
            };
        
            productService.addProduct(newProd).then(()=>{
              
              productService.getProducts().then((res)=>{
                setName("");
                setProducts(res);  

              })
              // const newProdList = [...products, newProd];
              
              // setProducts(newProdList);  
              //   setName("");
            })
    
            
    }

  return (
    <div>
        <form onSubmit={newProduct} className='flex items-center'>
        <input
                type="text"
                  value={name}
                  placeholder='Product/ business'
                  onChange={(e) => setName(e.target.value) & setError("")}
               
        />
        
        <button
        type="submit">
          <FaCirclePlus 
          className='fill-emerald-300 m-2' />
        </button>

      </form>
      <p className="text-sm text-red-500">{error}</p>
    </div>
  )
}

export default AddProduct