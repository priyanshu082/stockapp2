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
              {commutativeData.map((item, index) => (
                <tr className="text-black" key={index}>
                  <td className="border-[1px] text-sm text-center border-black ">{index + 1}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.Time}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.S_COI_Calls}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.S_C_Calls}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.PC_Calls.toFixed(3)}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.S_COI_Puts}</td>
                  <td className="border-[1px] text-sm text-center border-black ">{item.S_C_Puts}</td>
                  <td className="border-black border-[1px] text-center text-sm ">{item.PC_Puts.toFixed(3)}</td>
                  <td className="border-black border-[1px] flex justify-center ">    
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
