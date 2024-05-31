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
          <table className="w-[100%] border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                {headingCollection.map((heading, index) => (
                  <th
                    className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold"
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buySellData.slice().reverse().map((item, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {index + 1}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {item.Time}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {item.TotalBuyQuantity_Calls}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {item.TotalSellQuantity_Calls}
                  </td>
                  <td className="border border-gray-300 text-center h-[4vw] w-[9vw]">
                    <BarGraph
                      BuyerData={item.TotalBuyQuantity_Calls}
                      SellerData={item.TotalSellQuantity_Calls}
                    />
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {item.TotalBuyQuantity_Puts}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2 min-h-[200px]">
                    {item.TotalSellQuantity_Puts}
                  </td>
                  <td className="border border-gray-300 text-center h-[4vw] w-[9vw]">
                    <BarGraph
                      BuyerData={item.TotalBuyQuantity_Puts}
                      SellerData={item.TotalSellQuantity_Puts}
                    />
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
