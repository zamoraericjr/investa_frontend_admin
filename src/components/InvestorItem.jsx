
import { useEffect, useState } from "react";
import invService from "../services/invService";
import productService from "../services/productService";
import { useNavigate } from "react-router-dom";
import selService from "../services/selService";

function InvestorItem({name, investment, percent, invId, invProfit, investors, setInvestors, recs, invBody, setStatBtn, setTotal, prodKey, prodId, setProfit, setProfList, profList, setStat1, stat1, setProducts}) {
  const [coAmt, setCoAmt] = useState(0); 
  const [invRecs, setInvRecs] = useState(recs);
  const [cout, setCo] = useState(recs.reduce((accumulator, currentValue) => accumulator + currentValue ['amt'], 0));
  const [invBod, setInvBod] = useState(invBody)
  const [error, setError] = useState()  
  const [invItemRecsId, setInvItemRecsId] = useState("");
  const [invProdId, setInvProdId] = useState("");
    
  const navigate = useNavigate();

  // const inv = invBody.recs.find((inv1) => (inv1.id === invId));
  // setInvRecs(recs);

  // useEffect(()=>{

  //   invService.getInvestors().then((res)=>{

  //     const inv = res.find((inv1) => (inv1.id === invId));
  //     setInvRecs(inv.recs);

  //   //   const sum = inv.recs.reduce((accumulator, currentValue) => accumulator + currentValue ['amt'], 0);
  //   // setCo(sum);

  //   })    

  
  // }, []);

  const handleDelete = () => {

    invService.deleteInvestor(invId).then((_) => {
      const invs = investors.filter((invs) => invs.id !== invId)

      invService.getInvestors().then((res) => {
        const prodInvs = res.filter((prodInv) => prodInv.prod===prodKey);

        if(prodInvs==''){
        
          productService.getProducts().then((res1) => {
  
            const product1 = res1.find((pr)=>(pr.id===prodId));
            
            const changed = {
              ...product1,
              stat: 0,
              growth: 0,
              profits: []
            };
             
            productService.updateProduct(prodId, changed).then(()=> {
              setProfList([])
              setStatBtn("Delete")
              setStat1(0);
            
              setInvestors(prodInvs);

              productService.getProducts().then((res2)=>{
                setProducts(res2);  
              })
              
            })
          })
        }
        else{
  
          productService.getProducts().then((res1) => {
  
            const product1 = res1.find((pr)=>(pr.id===prodId));
            
            const amt = -(invProfit);
            const date = "jan 10, 2024";
      
            const newProf = {
              date,
              amt
            }; 
            const newProfits = [...profList, newProf];
            const changed = {
              ...product1,
              profits: newProfits,
            };
             
            productService.updateProduct(prodId, changed).then((res2)=> {
              setProfList(newProfits)
              setInvestors(prodInvs);

            })
          })
        }


      });


    })

    
  };

  const cashout = (e) => {
    e.preventDefault();

    if(coAmt > (invProfit-cout)){
      setError("Not enough cash");
      return;
    }

    if(coAmt <= 0){
      setError("Enter amount more than 0");
      return;
    }

    const amt = coAmt;
    let today = new Date();
    let year = today.getFullYear();
    let mnth = today.getMonth()+1;
    let day = today.getDate();
    const date = mnth+"-"+day+"-"+year;

    const newRec = {
      date,
      amt
    }; 

    invService.getInvestors().then((res) => {
      const inv = res.find((inv)=>inv.id == invId)
      const updatedRec = [...inv.recs, newRec];

      const changed = {
        ...inv,
        recs: updatedRec,
      };

      invService.updateInvRec(invId, changed).then((res1)=> {
        invService.getInvestors().then((res2)=>{
          const inv = res2.find((inv1) => (inv1.id === invId));
          const sum = inv.recs.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue ['amt']), 0);   
          setCo(sum);
          setCoAmt("");
          setInvBod(res1);
          setInvRecs(inv.recs);
          setError("");

          // productService.getProducts().then((res)=>{
          //   setProducts(res);  

          // })
  
        })      
      })
    })
  
  };

  const navInvRecs = () => {

    const key = 1;
    const sel = {
      prodId,
      invId,
      key
    }
    selService.addSelected(sel).then(()=>{
      navigate("/investor");
    })

  }


  if(stat1 == 1){
    return (

      <div className="items-center bg-teal-50 border-r-2 border-b-2 border-teal-100 p-1">
        <div className="md:flex items-center grow">
          <p className="w-48 font-bold">{name}</p>
          <div className="flex-1 flex md:justify-around items-center">
              <p className="mr-2 text-lg">{`${percent.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
              <p className="ml-2 mr-2 text-sm">{investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
          </div>
          <div className="flex-1 flex md:justify-end items-center">
              <div className="flex items-center mr-2 text-sm">
                  <p className="mr-2">{`${(invProfit-cout)
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})} /`}
                  </p>
                  <p className="text-lg">
                  {invProfit
                  .toLocaleString('en-US', 
                  {style: 'currency', 
                  currency: 'Php', 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 2})}
                  </p>
              </div>
          </div>
         
        </div>    
      </div>
    );
  }
  else if (stat1 == 2){
    if((invProfit-cout) > 0){
      return (

        <div className="items-center bg-red-200 border-r-2 border-b-2 border-red-500 p-1">
          <div className="md:flex items-center grow">
            <p className="w-48 font-bold">{name}</p>
            <div className="flex-1 flex md:justify-around items-center">
                <p className="mr-2 text-lg">{`${percent.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
                <p className="ml-2 mr-2 text-sm">{investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
            </div>
            <div className="flex-1 flex md:justify-end items-center text-blue-700">
                <div onClick={()=> navInvRecs()} className="items-center mr-2 text-sm click">
                    <p className="mr-2" >{`${(invProfit-cout)
                      .toLocaleString('en-US', 
                      {style: 'currency', 
                      currency: 'Php', 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 2})} /`}
                    </p>
                    <p className="text-lg font-bold">
                    {invProfit
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})}
                    </p>
                </div>
              
              <div>
              <form onSubmit={cashout} className="flex justify-end items-center mr-2">
                  <input
                          type="decimal"
                            value={coAmt}
                            onChange={(e) => setCoAmt(e.target.value) & setError("")}
                            className="shadow-md w-24"                            
                            disabled={false}
                          
                          />
                  <button
                          type="submit"
                          disabled={false}
                          className="rounded-lg flex-none m-1 bg-white shadow-md border-solid border-1.5 border-teal-600 p-2 text-teal-800 text-xs"
                      >
                        CO
                  </button>
                </form>  
                <p className="text-sm text-red-600">{error}</p>

              </div>
              
            </div>
           
          </div>    
        </div>
      );
    }
    else{
      return (

        <div className="items-center bg-red-200 border-r-2 border-b-2 border-red-500 p-1">
          <div className="md:flex items-center grow">
            <p className="w-48 font-bold">{name}</p>
            <div className="flex-1 flex md:justify-around items-center">
                <p className="mr-2 text-lg">{`${percent.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
                <p className="ml-2 mr-2 text-sm">{investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
            </div>
            <div className="flex-1 flex md:justify-end items-center">
                <div onClick={()=> navInvRecs()} cursor="pointer" className="items-center mr-2 text-sm text-blue-700 click">
                    <p className="mr-2">{`${(invProfit-cout)
                      .toLocaleString('en-US', 
                      {style: 'currency', 
                      currency: 'Php', 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 2})} /`}
                    </p>
                    <p className="text-lg font-bold">
                    {invProfit
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})}
                    </p>
                </div>
              
                <form onSubmit={cashout} className="flex justify-end items-center mr-2">
                  <input
                          type="decimal"
                            value={coAmt}
                            onChange={(e) => setCoAmt(e.target.value)}
                            className="shadow-md w-24"                            
                            disabled={true}
                          
                          />
                  <button
                          type="submit"
                          disabled={true}
                          className="rounded-lg flex-none m-1 bg-white shadow-md border-solid border-1.5 border-teal-600 p-2 text-gray-300 text-xs"
                      >
                        CO
                  </button>
                </form>  
            </div>
           
          </div>    
        </div>
      );
    }
  

  }
  else if (stat1 == 3){

    return (

      <div className="items-center bg-gray-300 border-r-2 border-b-2 border-gray-500 p-1">
        <div className="md:flex items-center grow">
          <p className="w-48 font-bold">{name}</p>
          <div className="flex-1 flex md:justify-around items-center">
              <p className="mr-2 text-lg">{`${percent.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 2})} %`}</p>
              <p className="ml-2 mr-2 text-sm">{investment.toLocaleString('en-US', {style: 'currency', currency: 'Php', minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
          </div>
          <div className="flex-1 flex md:justify-end items-center">
              <div onClick={()=> navInvRecs()} cursor="pointer" className="items-center mr-2 text-sm text-blue-700 click">
                  <p className="mr-2">{`${(invProfit-cout)
                    .toLocaleString('en-US', 
                    {style: 'currency', 
                    currency: 'Php', 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 2})} /`}
                  </p>
                  <p className="text-lg font-bold">
                  {invProfit
                  .toLocaleString('en-US', 
                  {style: 'currency', 
                  currency: 'Php', 
                  minimumFractionDigits: 0, 
                  maximumFractionDigits: 2})}
                  </p>
              </div>
            
              <div className="flex-none m-1"> 
                <button 
                onClick={()=> handleDelete()}
                className="rounded-lg flex-none m-1 bg-white shadow-md border-solid border-teal-600 p-2 text-teal-800 text-xs"
                >Clear
                </button>
              </div>
          </div>
         
        </div>    
      </div>
    );
  }
  else if(stat1==4){
    invService.deleteInvestor(invId).then((_) => {
      const invs = investors.filter((invs) => invs.id !== invId)

      invService.getInvestors().then((res) => {
        const prodInvs = res.filter((prodInv) => prodInv.prod===prodKey);

        productService.getProducts().then((res1) => {
  
          const product1 = res1.find((pr)=>(pr.id===prodId));
          
          const changed = {
            ...product1,
            stat: 0,
            growth: 0,
            profits: []
          };
           
          productService.updateProduct(prodId, changed).then(()=> {
            setProfList([])
            setStatBtn("Delete")
            setStat1(0);
          
            setInvestors(prodInvs);

            productService.getProducts().then((res2)=>{
              setProducts(res2);  
            })
            
          })
        })


      });


    })
  }


  
}

export default InvestorItem;