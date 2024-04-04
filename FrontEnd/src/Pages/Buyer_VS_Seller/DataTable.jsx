import {React} from 'react'
import BarGraph from "./BarGraph";

const DataTable = ({buySellData}) => {


    const headingCollection = [
        "S.No",
        "Time",
        "TotalBuyQuantity_Calls",
        "TotalSellQuantity_Calls",
        "BarGraph",
        "TotalBuyQuantity_Puts",
        "TotalSellQuantity_Puts",
        "BarGraph",
      ];
      

   
      // Render tables
      const tables = Array.isArray(buySellData) && buySellData?.length > 0 && (
        <div className="overflow-x-auto w-full h-auto ">
          <table className="w-[100%]">
            <thead>
              <tr>
                {headingCollection.map((heading, index) => (
                  <th
                    className=" bg-gray-300 border-[.5px] border-black   text-sm font-semibold"
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buySellData.map((item, index) => (
                <tr className="text-black" key={index}>
                  <td className="border-[1px] text-sm text-center border-black ">{index + 1}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.Time}</td>


                  <td className="border-[1px] text-sm text-center border-black ">{item.TotalBuyQuantity_Calls}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.TotalSellQuantity_Calls}</td>
                  <BarGraph  BuyerData={item.TotalBuyQuantity_Calls} SellerData={item.TotalSellQuantity_Calls}/>


                  <td className="border-[1px] text-sm text-center border-black ">{item.TotalBuyQuantity_Puts}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.TotalSellQuantity_Puts}</td>
                  <td className="border-black border-[1px] flex justify-center ">    
                  <BarGraph  BuyerData={item.TotalBuyQuantity_Puts} SellerData ={item.TotalSellQuantity_Puts}/>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
    
  return (
    <>
      {tables}
    </>
  )
}

export default DataTable
