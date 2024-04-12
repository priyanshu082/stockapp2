import { React } from 'react'

const DataTable = ({ allData }) => {


console.log(allData)
  const headingCollection = [
    "S.No",
    "underlyingValue",
    "COI_Calls",
    "Strike_Price",
    "COI_Puts",
    "C_Calls",
    "C_Puts",
    "C_Amt_Calls_Cr",
    "C_Amt_Puts_Cr",
    "S_C_Calls",
    "S_C_Puts",
    "S_COI_Calls",
    "S_COI_Puts",
    "R_S_COI",
    "Long_Short_Calls",
    "Long_Short_Puts"

  ];


  const blueShade = (value) => {
    // Calculate minValue and maxValue
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;

    if (Array.isArray(allData)) {
      allData.forEach(item => {
        minValue = Math.min(minValue, item.COI_Calls, item.COI_Puts);
        maxValue = Math.max(maxValue, item.COI_Calls, item.COI_Puts);
      });
    }

    // If your data is empty or not an array, set default values
    minValue = minValue === Number.MAX_VALUE ? 0 : minValue;
    maxValue = maxValue === Number.MIN_VALUE ? 100 : maxValue;
    const normalizedValue = (value - minValue) / (maxValue - minValue); // Normalize value
    const gradientColor = `rgba(0, 255, 255, ${normalizedValue})`; // Adjust color based on value
    return gradientColor;
  };
  
  const yellow=(index,columnName)=>{
    if (index === index_of_current_strikePrice && columnName === "COI_Puts") {
      return {
        backgroundColor: "yellow", // Set background color to white
      };
    }
   else if (index === index_of_current_strikePrice && columnName === "COI_Calls") {
      return {
        backgroundColor: "yellow", // Set background color to white
      };
    }
    
    return {};
  }
  // Find the index of the row with the minimum absolute difference between Strike_Price and underlyingValue
  const indexOfCurrentStrikePrice = () => {
    if (!allData || allData.length === 0) return -1;

    let minDiff = Math.abs(
      allData[0].Strike_Price - allData[0].underlyingValue
    );
    let index = 0;

    for (let i = 1; i < allData.length; i++) {
      let diff = Math.abs(allData[i].Strike_Price - allData[i].underlyingValue);
      if (diff < minDiff) {
        minDiff = diff;
        index = i%24;
      }
    }

    return index;
  };

 
// console.log(indexOfCurrentStrikePrice());
  // Get the index of the row with the minimum absolute difference
  const index_of_current_strikePrice = indexOfCurrentStrikePrice();

  // Define a function to apply styles to the row
  const getRowStyle = (index) => {
    // If the index matches indexOfCurrentStrikePrice, return the styles
    if (index === index_of_current_strikePrice) {
      return {
        backgroundColor: "yellow ",
        color: "black",
        fontWeight: "600",
      };
    }
    // Otherwise, return an empty object for no styling
    return {};
  };

  // Define a function to apply styles to the row
  const getCellStyle = (index, columnName) => {
    // If the index matches index_of_current_strikePrice and the column is C_Amt_Calls_Cr, return the styles
    if (
      index >= 0 &&
      index < index_of_current_strikePrice - 0 &&
      columnName === "C_Amt_Calls_Cr"
    ) {
      return {
        backgroundColor: "#FF6347",
      };
    } else if (
      index >= index_of_current_strikePrice + 1 &&
      columnName === "C_Amt_Puts_Cr"
    ) {
      return {
        backgroundColor: "#90EE90",
      };
    }
    // Otherwise, return an empty object for no styling
    return {};
  };


  const getColumnData = (index, columnName) => {

    // Define conditions and values for each column
    const columnData = {
      "S_COI_Puts": {
        condition: (index >= index_of_current_strikePrice && index <= index_of_current_strikePrice) && allData[index].S_COI_Puts !== null,
        value: allData[index].S_COI_Puts
      },
      "S_COI_Calls": {
        condition: (index >= index_of_current_strikePrice && index <= index_of_current_strikePrice) && allData[index].S_COI_Calls !== null,
        value: allData[index].S_COI_Calls
      },
      "S_C_Puts": {
        condition: (index >= index_of_current_strikePrice && index <= index_of_current_strikePrice) && allData[index].S_C_Puts !== null,
        value: allData[index].S_C_Puts
      },
      "S_C_Calls": {
        condition: (index >= index_of_current_strikePrice && index <= index_of_current_strikePrice) && allData[index].S_C_Calls !== null,
        value: allData[index].S_C_Calls
      },
      "R_S_COI": {
        condition: (index >= index_of_current_strikePrice && index <= index_of_current_strikePrice) && allData[index].R_S_COI.toFixed(2) !== null,
        value: allData[index].R_S_COI.toFixed(2)
      }

    };

    // Check if the column name exists in the columnData object and return the corresponding value
    const data = columnData[columnName];
    if (data && data.condition) {
      return data.value;
    }
    return "";
  };


  const getBackgroundColor = (value) => ({
    'Long Unwinding ↑': { backgroundColor: 'orange' },
    'Short Covering ↑': { backgroundColor: 'skyblue' },
    'Long Buildup ↓': { backgroundColor: 'lightgreen' },
    'Short Buildup ↓': { backgroundColor: '#FF6347' },
  }[value] || {backgroundColor: 'white'});
  
  
  

  // Assuming allData contains your data
  // You can group data based on Time
  const groupedData = [];

  Array.isArray(allData) &&
    allData?.length > 0 &&
    allData.forEach((item) => {
      const time = item.Time;
      if (!groupedData[time]) {
        groupedData[time] = [];
      }
      groupedData[time].push(item);
    });
  // Sort keys of groupedData in descending order
  const sortedKeys = Object.keys(groupedData).sort((a, b) => {
    // Assuming 'Time' is in format 'HH:MM:SS'
    // Split the time and compare
    const timeA = a.split(":").map(Number);
    const timeB = b.split(":").map(Number);

    // Compare hours, if hours are the same, compare minutes
    for (let i = 0; i < 3; i++) {
      if (timeA[i] !== timeB[i]) {
        return timeB[i] - timeA[i];
      }
    }
    return 0;
  });

  // Render tables in descending order of time
  const tables = sortedKeys.map((time, index) => (
    <div className="overflow-x-auto w-full h-auto mb-[100px]" key={index}>
      <h2 className="font-bold">Table for Time: {time}</h2>
      <table className="w-[100%]">
        <thead>
          <tr>
            {headingCollection.map((heading, index) => (
              <th
                className=" z-20 bg-gray-300 border-[.5px] border-black px-[2px] text-sm font-semibold"
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groupedData[time].map((item, index) => (
            <tr className="text-black " key={index} style={getRowStyle(index)}>
              {/* <td className='border-black border-[1px] ' >{index}</td> */}
              <td className="border-[1px] text-sm border-black px-[3px]">
                {index + 1}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">
                {item.underlyingValue}
              </td>

              <td
                className="border-black text-sm border-[1px] px-[5px]"
                style={{
                  background: blueShade(item.COI_Calls),
                  ...yellow(index, "COI_Calls") // Merge styles
                }}
              >
                {item.COI_Calls}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">
                {item.Strike_Price}
              </td>
              <td
                className="border-[1px] text-sm border-black px-[3px]"
                style={{
                  background: blueShade(item.COI_Puts),
                  ...yellow(index, "COI_Puts") // Merge styles
                }}
              >
                {item.COI_Puts}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">
                {item.C_Calls}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">
                {item.C_Puts}
              </td>
              <td
                className="border-[1px] text-sm border-black px-[3px]"
                style={getCellStyle(index, "C_Amt_Calls_Cr")}
              >
                {item.C_Amt_Calls_Cr}
              </td>
              <td
                className="border-[1px] text-sm border-black px-[3px]"
                style={getCellStyle(index, "C_Amt_Puts_Cr")}
              >
                {item.C_Amt_Puts_Cr}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">

                {getColumnData(index, "S_C_Calls")}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">

                {getColumnData(index, "S_C_Puts")}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">

                {getColumnData(index, "S_COI_Calls")}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">
                {getColumnData(index, "S_COI_Puts")}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]">

                {getColumnData(index, "R_S_COI")}

              </td>
              <td className={`border-[1px] text-sm border-black px-[3px] `}
               style={getBackgroundColor(item.Long_Short_Calls)}
               >
                {item.Long_Short_Calls}
              </td>
              <td className="border-[1px] text-sm border-black px-[3px]"
              style={getBackgroundColor(item.Long_Short_Puts)}>
                {item.Long_Short_Puts}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));

  return (
    <>
      {tables}
    </>
  )
}

export default DataTable
