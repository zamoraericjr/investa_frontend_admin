import {useState, useEffect } from "react";

import Product from "../components/Product";
import productService from "../services/productService";
import AddProduct from "../components/AddProduct";
import invService from "../services/invService";
import selService from "../services/selService";
import { useNavigate } from "react-router-dom";
import InvRecs from "../components/InvRecs";

function Investor() {
  const [name, setName] = useState("");
  const [prodName, setProdName] = useState("");
  const [recs, setRecs] = useState([]);
  const [investment, setInvestment] = useState(0);
  const [invProfit, setInvProfit] = useState(0);
  const [total, setTotal] = useState(0);
  const [cOut, setCOut] = useState(0);
  const [prodProfit, setProdProfit] = useState(0);
  const [bgStat, setBgStat] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
 selService.getSelected().then((res)=> {

    const sel = res.find((sel)=>sel.key==1);

    invService.getInvestors().then((res1) => {
        const inv = res1.find((inv) => inv.id == sel.invId);
        setName(inv.name);
        setRecs(inv.recs);
        
        setInvestment(inv.investment)

        const sumCo = inv.recs.reduce((accumulator, currentValue) => accumulator + currentValue ['amt'], 0);
        setCOut(sumCo);
        

        const prodInvs = res1.filter((prodInv) => prodInv.prod===inv.prod);  
        const sumInv = prodInvs.reduce((accumulator, currentValue) => accumulator + currentValue ['investment'], 0);
        setTotal(sumInv);


    })
    productService.getProducts().then((res1) => {
        const prod = res1.find((prod) => prod.id == sel.prodId);
        setProdName(prod.name);
        setProdProfit(prod.growth);
        if(prod.stat==2){
            setBgStat("table w-full fixed top-0 left-0 right-0 ml-0 mr-0 items-center bg-red-200 border-r-2 border-b-2 border-red-500 p-1")
        }
        else if(prod.stat==3){
            setBgStat("table w-full fixed top-0 left-0 right-0 ml-0 mr-0 items-center bg-gray-300 border-r-2 border-b-2 border-gray-500 p-1")
        }

    })

 })   
  }, []);

  const navHome = () =>{
    navigate("/");
  }

  

  return (

    <div>
      <div className={bgStat}>
        <div className="m-1 mb-2">
          <h3>Investa</h3>

          <div className="items-center">
        <div className="md:flex items-center grow">
            <div className="w-48">
            <p className="font-bold">{name}</p>
            <p>{prodName}</p>  
            </div>  
          
          <div className="flex-1 flex md:justify-around items-center">
              <p className="mr-2 text-lg">{`${((investment/total)*100).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
              <div>
              <p className="ml-2 mr-2 text-sm">{`${investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}/`}</p>
              <p className="ml-2 mr-2 text-lg">{total.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
              </div>
              
          </div>
          <div className="flex-1 flex md:justify-end items-center">
              <div className="mr-2 text-sm">
                  <p className="mr-2">{`${((prodProfit*(investment/total))-cOut)
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})} /`}
                  </p>
                  <p className="text-lg">
                  {(prodProfit*(investment/total))
                  .toLocaleString('en-US', 
                  {style: 'currency', 
                  currency: 'Php', 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 2})}
                  </p>
              </div>
            
              <div className="flex-none m-1"> 
                <button 
                onClick={()=> navHome()}
                className="rounded-lg flex-none m-1 bg-white shadow-md border-solid border-1.5 border-teal-600 p-2 text-teal-800 text-xs"
                >Back
                </button>
              </div>
          </div>
         
        </div>    
      </div>
          
        </div>      
      </div>

      <div>
      <div className="table w-full top-0 left-0 right-0 ml-0 mr-0 items-center bg-red-200 border-r-2 border-b-2 border-red-500 p-1">
        <div className="m-1 mb-2">
          <h3>Investa</h3>

          <div className="items-center">
        <div className="md:flex items-center grow">
            <div className="w-48">
            <p className="font-bold">{name}</p>
            <p>{prodName}</p>  
            </div>  
          
          <div className="flex-1 flex md:justify-around items-center">
              <p className="mr-2 text-lg">{`${((investment/total)*100).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
              <p className="ml-2 mr-2 text-sm">{investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
          </div>
          <div className="flex-1 flex md:justify-end items-center">
              <div className="flex items-center mr-2 text-sm">
                  <p className="mr-2">{`${((prodProfit*(investment/total))-cOut)
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})} /`}
                  </p>
                  <p className="text-lg">
                  {(prodProfit*(investment/total))
                  .toLocaleString('en-US', 
                  {style: 'currency', 
                  currency: 'Php', 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 2})}
                  </p>
              </div>
            
              <div className="flex-none m-1"> 
                <button 
                onClick={()=> navHome()}
                className="rounded-lg flex-none m-1 bg-white shadow-md border-solid border-1.5 border-teal-600 p-2 text-teal-800 text-xs"
                >Back
                </button>
              </div>
          </div>
         
        </div>    
      </div>
          
        </div>      
      </div>
      {recs.map((invRecs)=>
      (<InvRecs
        key = {Math.random()*1000}
      amt = {invRecs.amt}
      date = {invRecs.date}
      />))}
      </div>
  
   
    </div>
  );
}

export default Investor;