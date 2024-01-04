import React, { useState } from 'react'
import productService from '../services/productService';
import invService from '../services/invService';
import { FaCirclePlus } from 'react-icons/fa6';

function AddProfit({prodId, profList, setProfList, setProfit, stat1, setInvestors, keyProd, setProducts}) {
    const [addNewProfit, setAddNewProfit] = useState(0);
    const [error, setError] = useState("");

    const addProfit = (e) => {
        e.preventDefault();

        if(addNewProfit<=0){
          setError("Enter amount more than 0")
          return;
        }
        else{
          productService.getProducts().then((res) => {
  
            const product1 = res.find((pr)=>(pr.id===prodId));
            
            const amt = Number(addNewProfit);
            const date = "jan 10, 2024";
            const newGrowth = product1.growth+amt;
      
            const newProf = {
              date,
              amt
            }; 
            const newProfits = [...profList, newProf];
            const changed = {
              ...product1,
              growth: newGrowth, 
              profits: newProfits,
            };
             
            productService.updateProduct(prodId, changed).then((res)=> {
      
              // productService.getProducts().then((res2) => {
              //   invService.getInvestors().then((res1) => {
  
              //     const prodInvs = res1.filter((prodInv) => prodInv.prod===keyProd);
              //     const profAmt = 'amt';
              //     const sum = res.profits.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue [profAmt]), 0);
              //     setProfit(sum);
              //     setAddNewProfit(0);
              //     setProfList(newProfits)
              //     setError("")
              //     setInvestors(prodInvs);
              //     setProducts(res2);
              //   });
              // })

              invService.getInvestors().then((res1) => {
  
                const prodInvs = res1.filter((prodInv) => prodInv.prod===keyProd);
                const profAmt = 'amt';
                const sum = res.profits.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue [profAmt]), 0);
                setProfit(sum);
                setAddNewProfit(0);
                setProfList(newProfits)
                setError("")
                setInvestors(prodInvs);
              });
           
            })
  
      
  
          })
        }
      };

      if(stat1===2){
        return (
            <div>
                  <form onSubmit={addProfit} className='flex justify-end items-center'>
                <input
                        type="number"
                          value={addNewProfit}
                          onChange={(e) => setAddNewProfit(e.target.value) & setError("")}
                          className='w-24'
                          placeholder='Profit'
                        
                />

            <button
                type="submit"
            >
        <FaCirclePlus 
        className = "fill-emerald-300 m-2"/>

        </button>
              </form>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )
      }
      else if(stat1===3){
        return null;
      }


}

export default AddProfit