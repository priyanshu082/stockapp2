import {React} from 'react'
import BarGraph from "./BarGraph";

const DataTableComm = ({commutativeData}) => {

  

    const headingCollection = [
        "S.No",
        "Time",
        "S_COI_Calls",
        "S_C_Calls",
        "PC_Calls",
        "S_COI_Puts",
        "S_C_Puts",
        "PC_Puts",
        "BarGraph"
      ];
      

   
      // Render tables
      const tables = Array.isArray(commutativeData) && commutativeData?.length > 0 && (
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
              {commutativeData.slice().reverse().map((item, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.Time}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.S_COI_Calls}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.S_C_Calls}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.PC_Calls.toFixed(3)}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.S_COI_Puts}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.S_C_Puts}
                  </td>
                  <td className="text-sm text-center border border-gray-300 px-4 py-2">
                    {item.PC_Puts.toFixed(3)}
                  </td>
                  <td className="border border-gray-300 text-center w-[9vw] h-[4vw]">
                    <BarGraph
                      item={item}
                      PC_Calls={item.PC_Calls.toFixed(3)}
                      PC_Puts={item.PC_Puts.toFixed(3)}
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

export default DataTableComm
