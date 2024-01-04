import React, { useEffect, useState } from 'react'
import invService from '../services/invService';
import InvestorItem from './InvestorItem';
import productService from '../services/productService';
import AddInv from './AddInv';
import AddProfit from './AddProfit';

function Product({keyProd, prodName, stat, products, setProducts, prodId, profits, growth, date}) {

    const [profit, setProfit] = useState(0);
    const [total, setTotal] = useState(0);
    const [investors, setInvestors] = useState([]);
    const [profList, setProfList] = useState([]);
    const [statBtn, setStatBtn] = useState(); 
    const [stat1, setStat1] = useState(); 

    useEffect(() => {

      setProfList(profits);
      setProfit(growth);

        invService.getInvestors().then((res) => {

          const prodInvs = res.filter((prodInv) => prodInv.prod===keyProd);  
          const sum = prodInvs.reduce((accumulator, currentValue) => accumulator + currentValue ['investment'], 0);

          setTotal(sum);
          setInvestors(prodInvs);
        });

        // const sum = profits.reduce((accumulator, currentValue) => accumulator + currentValue ['amt'], 0);
        // setProfit(sum);

        productService.getProducts().then((res) => {

          const product1 = res.find((pr)=>(pr.id===prodId));

          if(product1.stat==0){
            setStatBtn("Delete")
            setStat1(0)
          }
          else if(product1.stat==1){
            setStatBtn("Close")
            setStat1(1)
          }
          else if(product1.stat==2){
            setStatBtn("End")
            setStat1(2)
          }
          else if(product1.stat==3){
            setStatBtn("Clear all to delete/ renew")
            setStat1(3)
          }
          else if(product1.stat==4){
            setStatBtn("Clear all to delete/ renew")
            setStat1(4)
          }
           
        })


      }, []);

      const changeStat = () => {

        productService.getProducts().then((res) => {

          const product1 = res.find((pr)=>(pr.id===prodId));

          if(product1.stat === 0){
            productService.deleteProduct(prodId).then((_) => {
              setProducts(products.filter((prods) => prods.id !== prodId));
            })
          }
          else if (product1.stat === 1){
            productService.getProducts().then((res) => {
  
              const product1 = res.find((pr)=>(pr.id===prodId));
              
              const changed = {
                ...product1,
                stat: 2,
              };
               
              productService.updateProduct(prodId, changed).then(()=> {
                setStatBtn("End")
                setStat1(2)
              })
            })
          }
  
          else if (product1.stat === 2){
            productService.getProducts().then((res) => {
  
              const product1 = res.find((pr)=>(pr.id===prodId));
              
              const changed = {
                ...product1,
                stat: 3,
              };
               
              productService.updateProduct(prodId, changed).then(()=> {
                setStatBtn("Clear all to delete/ renew")
                setStat1(3)
              })
            })
          }
          else if (product1.stat === 3){
            productService.getProducts().then((res) => {
  
              const product1 = res.find((pr)=>(pr.id===prodId));
              
              const changed = {
                ...product1,
                stat: 4,
              };
               
              productService.updateProduct(prodId, changed).then(()=> {
                setStatBtn("Clear all to delete/ renew")
                setStat1(4)
              })
            })
          }           
        }) 
      };

      // const addInv = (e) => {
      //   e.preventDefault();
      //   const prod = keyProd;
      //   const recs = [];
  
      //     const newInv = {
      //         investment,
      //         name,
      //         prod,
      //         recs,
      //       };
        
      //       invService.addInvestor(newInv).then(()=>{

      //         invService.getInvestors().then((res) => {

      //           const prodInvs = res.filter((prodInv) => prodInv.prod===keyProd);  
      //           const sum = prodInvs.reduce((accumulator, currentValue) => accumulator + currentValue ['investment'], 0);
      
      //           setTotal(sum);
      //           setInvestors(prodInvs);

      //           setName("");
      //           setInitInv("");

      //           productService.getProducts().then((res) => {

      //             const product1 = res.find((pr)=>(pr.id===prodId));
                  
      //             const changed = {
      //               ...product1,
      //               stat: 1,
      //             };
                   
      //             productService.updateProduct(prodId, changed).then(()=> {
      //               setStatBtn("Close")
      //             })
      //           })
      
      //         });     
      //       })  
      // };


    // const addProfit = (e) => {
    //   e.preventDefault();
    //   productService.getProducts().then((res) => {

    //     const product1 = res.find((pr)=>(pr.id===prodId));
        
    //     const amt = Number(addNewProfit);
    //     const date = "jan 10, 2024";
  
    //     const newProf = {
    //       date,
    //       amt
    //     }; 
    //     const newProfits = [...profList, newProf];
    //     const changed = {
    //       ...product1,
    //       profits: newProfits,
    //     };
         
    //     productService.updateProduct(prodId, changed).then((res)=> {
    //       const profAmt = 'amt';
    //       const sum = res.profits.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue [profAmt]), 0);
    //       setProfit(sum);
    //       setAddNewProfit("");
    //       setProfList(newProfits)
    //     })
    //   })
    // };

    

  return (
    <div className="ml-3 mr-3 mb-6 border-l-4 border-teal-700 shadow-md">

      <div className="rounded-tr-lg flex border-4 border-teal-700">
      <div className= "bg-teal-700 grow">
        <div className="flex justify-between items-center m-2">
          <div className='w-40'>
          <p className="font-bold md:text-2xl text-teal-100">{prodName}</p>
          <p className="text-teal-200 text-sm" >{date}</p>     
          </div>

          

          {stat==0 || stat==1 ? 
          <p className="text-teal-100 md:text-lg ml-2">{`${total.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}`}</p> 
          : 
          <div className="justify-center items-center m-2">
            <p className="text-teal-100 text-sm">{`${profit.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})} /`}</p>
            <p className="text-teal-100 md:text-lg">{`${total.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}`}</p>
          </div>}

          {stat==0 || stat==1 ? <p></p> : <p className="text-teal-100 md:text-lg">{`${(profit/total*100).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>}    

        </div>
        <div className="flex justify-between items-center m-2">
        {stat == 0 || stat == 1? 
        <p className="text-green-300 text-sm">Open</p> 
        : stat == 2 ? 
        <p className="text-red-200 text-sm">Closed</p> 
        : <p className="text-gray-200 text-sm">End</p>}
          

        {stat1 >= 2 ? 
      <AddProfit
      prodId = {prodId}
      profList = {profList}
      setProfList = {setProfList}
      profit = {profit}
      setProfit = {setProfit}
      stat1 = {stat1}
      setInvestors = {setInvestors}
      keyProd={keyProd}
      setProducts={setProducts}
      /> 
      : 
      <AddInv
      keyProd={keyProd}
      setTotal= {setTotal}
      setInvestors = {setInvestors}
      setStatBtn = {setStatBtn}
      prodId = {prodId}
      setStat1 = {setStat1}
      />}

        </div>



   
      </div>
      <button onClick={() => changeStat()} className="rounded-lg m-1 bg-teal-50 shadow-md border-solid p-1 text-teal-800">{statBtn}</button>
      </div>

    {
    investors.map((invs) => (
        <InvestorItem 
            key = {Math.random()*1000}
            name = {invs.name}
            investment = {invs.investment}
            percent = {invs.investment/total*100}
            invId = {invs.id}
            prodKey = {invs.prod}
            prodId = {prodId}
            // invProfit = {profit*invs.investment/total}
            invProfit = {profit*invs.investment/total}
            investors = {investors}
            setInvestors = {setInvestors}
            recs = {invs.recs}
            invBody = {invs}
            setStatBtn = {setStatBtn}
            setTotal = {setTotal}
            setProfit = {setProfit}
            profList = {profList}
            setProfList = {setProfList}
            setStat1={setStat1}
            stat1={stat1}
            prodGrowth = {growth}
            setProducts = {setProducts}
           
        />
    ))}
    </div>
  )
}

export default Product