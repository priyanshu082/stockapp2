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
        <div className="overflow-x-auto items-center flex justify-center">
          <table className="w-[100%] ">
            <thead >
              <tr >
                {headingCollection.map((heading, index) => (
                  <th
                    className=" bg-gray-300 border-black text-sm font-semibold"
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="h-[100vw]">
      {buySellData.slice().reverse().map((item, index) => (
        <tr className="text-black" key={index}>
          <td className="text-sm text-center border-black min-h-[200px]">
            {index + 1}
          </td>
          <td className="text-sm text-center border-black min-h-[200px]">
            {item.Time}
          </td>
          <td className="text-sm text-center border-black min-h-[200px]">
            {item.TotalBuyQuantity_Calls}
          </td>
          <td className="text-sm text-center border-black min-h-[200px]">
            {item.TotalSellQuantity_Calls}
          </td>
          <td className="border-black text-center h-[4vw] w-[9vw]">
            <BarGraph
              BuyerData={item.TotalBuyQuantity_Calls}
              SellerData={item.TotalSellQuantity_Calls}
            />
          </td>
          <td className="text-sm text-center border-black min-h-[200px]">
            {item.TotalBuyQuantity_Puts}
          </td>
          <td className="text-sm text-center border-black min-h-[200px]">
            {item.TotalSellQuantity_Puts}
          </td>
          <td className="border-black text-center h-[4vw] w-[9vw]">
            <BarGraph
              BuyerData={item.TotalBuyQuantity_Puts}
              SellerData={item.TotalSellQuantity_Puts}
            />
          </td>
        </tr>
      ))}
    </tbody>
            {/* <tbody className='h-[40vw]'>
              {buySellData.slice().reverse().map((item, index) => (
                <tr className="text-black" key={index}>
                  <td className="text-sm text-center border-black min-h-[3vw]">{index + 1}</td>
                  <td className=" text-sm text-center border-black ">{item.Time}</td>


                  <td className=" text-sm text-center border-black ">{item.TotalBuyQuantity_Calls}</td>
                  <td className=" text-sm text-center border-black ">{item.TotalSellQuantity_Calls}</td>
                  <td className="border-black text-center h-[4vw] w-[10vw]"> 
                  <BarGraph  BuyerData={item.TotalBuyQuantity_Calls} SellerData={item.TotalSellQuantity_Calls}/>
                  </td>

                  <td className=" text-sm text-center border-black ">{item.TotalBuyQuantity_Puts}</td>
                  <td className=" text-sm text-center border-black ">{item.TotalSellQuantity_Puts}</td>
                  <td className="border-black text-center h-[4vw] w-[10vw]">    
                  <BarGraph  BuyerData={item.TotalBuyQuantity_Puts} SellerData ={item.TotalSellQuantity_Puts}/>
              </td>
                </tr>
              ))}
            </tbody> */}
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
