import React, { useState } from 'react'
import invService from '../services/invService';
import productService from '../services/productService';
import { FaCirclePlus } from 'react-icons/fa6';

function AddInv({keyProd, setTotal, setInvestors, setStatBtn, prodId, setStat1}) {
    const [name, setName] = useState("");
    const [investment, setInitInv] = useState(0);
    const [error, setError] = useState("");

    const addInv = (e) => {
      e.preventDefault();

      if(name.length<= 2){
        setError("Enter valid name");
        return;
      }
      if(investment<=0){
        setError("Enter amount more than 0");
        return;
      }
    
        const prod = keyProd;
        const recs = [];
  
          const newInv = {
              investment,
              name,
              prod,
              recs,
            };
        
            invService.addInvestor(newInv).then(()=>{

              invService.getInvestors().then((res) => {

                const prodInvs = res.filter((prodInv) => prodInv.prod===keyProd);  
                const sum = prodInvs.reduce((accumulator, currentValue) => accumulator + currentValue ['investment'], 0);
      
                setTotal(sum);
                setInvestors(prodInvs);

                setName("");
                setInitInv("");

                productService.getProducts().then((res) => {

                  const product1 = res.find((pr)=>(pr.id===prodId));
                  
                  const changed = {
                    ...product1,
                    stat: 1,
                    growth: 0,
                    profits: []
                  };
                   
                  productService.updateProduct(prodId, changed).then(()=> {
                    setStatBtn("Close")
                    setStat1(1)
                    setError("");

                  })
                })
      
              });     
            })  
      };

  return (
    <div >
              <form onSubmit={addInv} className='flex justify-end items-center'
      >
        <input
                type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value) & setError("")}
                  className='mr-2 w-40'
                  placeholder='Name of investor'
               
                />
        
        <input
                type="number"
                  value={investment}
                  onChange={(e) => setInitInv(e.target.value) & setError("")}
                  className='mr-2 w-24'
                />
        <button
                type="submit"
            >
                   <FaCirclePlus 
        className = "fill-emerald-300 m-2"/>

        </button>
    

      </form>
      <p className="text-sm text-red-500 flex justify-end">{error}</p>
    </div>
  )
}

export default AddInv