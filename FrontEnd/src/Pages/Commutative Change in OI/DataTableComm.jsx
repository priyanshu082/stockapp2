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
        <div className="overflow-x-auto w-full h-auto ">
          <table className="w-[100%]">
            <thead>
              <tr>
                {headingCollection.map((heading, index) => (
                  <th className="bg-gray-300 border-[.5px] border-black text-sm font-semibold max-content"
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {commutativeData.slice().reverse().map((item, index) => (
                <tr className="text-black" key={index}>
                  <td className=" text-sm text-center max-content">{index + 1}</td>
                  <td className=" text-sm text-center max-content">{item.Time}</td>
                  <td className=" text-sm text-center max-content">{item.S_COI_Calls}</td>
                  <td className=" text-sm text-center max-content">{item.S_C_Calls}</td>
                  <td className=" text-sm text-center max-content">{item.PC_Calls.toFixed(3)}</td>
                  <td className=" text-sm text-center max-content">{item.S_COI_Puts}</td>
                  <td className=" text-sm text-center max-content">{item.S_C_Puts}</td>
                  <td className=" text-sm text-center max-content">{item.PC_Puts.toFixed(3)}</td>
                  <td className=" text-center text-sm w-[9vw] h-[4vw]">    
                  <BarGraph item={item}  PC_Calls={item.PC_Calls.toFixed(3)} PC_Puts ={item.PC_Puts.toFixed(3)}/>
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
