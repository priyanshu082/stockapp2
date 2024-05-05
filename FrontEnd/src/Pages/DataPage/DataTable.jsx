import { React } from 'react';

const DataTable = ({ allData, noOfStrikes }) => {
  const headingCollection = [
    'S.No',
    'underlyingValue',
    'COI_Calls',
    'Strike_Price',
    'COI_Puts',
    'C_Calls',
    'C_Puts',
    'C_Amt_Calls_Cr',
    'C_Amt_Puts_Cr',
    'S_C_Calls',
    'S_C_Puts',
    'S_COI_Calls',
    'S_COI_Puts',
    'R_S_COI',
    'Long_Short_Calls',
    'Long_Short_Puts',
  ];

  const blueShade = (value) => {
    // Calculate minValue and maxValue
    let minValue = Number.MAX_VALUE;
    let maxValue = Number.MIN_VALUE;

    if (Array.isArray(allData)) {
      allData.forEach((item) => {
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

  

  const indexOfCurrentStrikePrice = (groupedData, time, noOfStrikes) => {
    const data = groupedData[time];
    if (!data || data.length === 0) return -1;
    let minDiff = Math.abs(data[0].Strike_Price - data[0].underlyingValue);
    // console.log(minDiff);
    let index = 0;
    for (let i = 1; i < data.length; i++) {
      let diff = Math.abs(data[i].Strike_Price - data[i].underlyingValue);
      if (diff < minDiff) {
        minDiff = diff;
        index = i % (noOfStrikes * 2);
      }
    }
    // console.log(minDiff);
    // console.log('index:-', index);
    return index;
  };

  const yellow = (index, columnName, groupedData, time) => {
    const index_of_current_strikePrice = indexOfCurrentStrikePrice(groupedData, time, noOfStrikes);
    if (index === index_of_current_strikePrice && columnName === 'COI_Puts') {
      return {
        backgroundColor: 'yellow',
      };
    } else if (index === index_of_current_strikePrice && columnName === 'COI_Calls') {
      return {
        backgroundColor: 'yellow',
      };
    }

    return {};
  };

  const getRowStyle = (index, groupedData, time, noOfStrikes) => {
    const index_of_current_strikePrice = indexOfCurrentStrikePrice(groupedData, time, noOfStrikes);
    if (index === index_of_current_strikePrice) {
      return {
        backgroundColor: 'yellow ',
        color: 'black',
        fontWeight: '600',
      };
    }
    return {};
  };

  const getCellStyle = (index, columnName, groupedData, time, noOfStrikes) => {
    const index_of_current_strikePrice = indexOfCurrentStrikePrice(groupedData, time, noOfStrikes);
    const data = groupedData[time];
    if (index >= 0 && index < index_of_current_strikePrice - 0 && columnName === 'C_Amt_Calls_Cr') {
      return {
        backgroundColor: '#FF6347',
      };
    } else if (index >= index_of_current_strikePrice + 1 && columnName === 'C_Amt_Puts_Cr') {
      return {
        backgroundColor: '#90EE90',
      };
    }
    return {};
  };

  const getColumnData = (index, columnName, groupedData, time, noOfStrikes) => {
    const data = groupedData[time];
    const index_of_current_strikePrice = indexOfCurrentStrikePrice(groupedData, time, noOfStrikes);
  
    const columnDataObj = {
      "S_COI_Puts": {
        condition:
          index >= index_of_current_strikePrice &&
          index <= index_of_current_strikePrice &&
          data[index].S_COI_Puts !== null,
        value: data[index].S_COI_Puts,
      },
      "S_COI_Calls": {
        condition:
          index >= index_of_current_strikePrice &&
          index <= index_of_current_strikePrice &&
          data[index].S_COI_Calls !== null,
        value: data[index].S_COI_Calls,
      },
      "S_C_Puts": {
        condition:
          index >= index_of_current_strikePrice &&
          index <= index_of_current_strikePrice &&
          data[index].S_C_Puts !== null,
        value: data[index].S_C_Puts,
      },
      "S_C_Calls": {
        condition:
          index >= index_of_current_strikePrice &&
          index <= index_of_current_strikePrice &&
          data[index].S_C_Calls !== null,
        value: data[index].S_C_Calls,
      },
      "R_S_COI": {
        condition:
          index >= index_of_current_strikePrice &&
          index <= index_of_current_strikePrice &&
          data[index].R_S_COI?.toFixed(2) !== null,
        value: data[index].R_S_COI?.toFixed(2),
      },
    };
  
    const columnData = columnDataObj[columnName];
    if (columnData && columnData.condition) {
      return columnData.value;
    }
    return '';
  };

  const getBackgroundColor = (value) => ({
    'Long Unwinding ↑': { backgroundColor: 'orange' },
    'Short Covering ↑': { backgroundColor: 'skyblue' },
    'Long Buildup ↓': { backgroundColor: 'lightgreen' },
    'Short Buildup ↓': { backgroundColor: '#FF6347' },
  }[value] || { backgroundColor: 'white' });

  const groupedData = {};

  Array.isArray(allData) &&
    allData?.length > 0 &&
    allData.forEach((item) => {
      const time = item.Time;
      if (!groupedData[time]) {
        groupedData[time] = [];
      }
      groupedData[time].push(item);
    });

  // console.log(groupedData);

  const sortedKeys = Object.keys(groupedData).sort((a, b) => {
    const timeA = a.split(':').map(Number);
    const timeB = b.split(':').map(Number);

    for (let i = 0; i < 3; i++) {
      if (timeA[i] !== timeB[i]) {
        return timeB[i] - timeA[i];
      }
    }
    return 0;
  });

  // console.log(sortedKeys);

  const tables = sortedKeys.map((time, index) => (
    <div className="overflow-x-auto w-full h-auto mb-[100px]" key={index}>
      <h2 className="font-bold">Table for Time: {time}</h2>
      <table className="w-[100%] ">
        <thead className="border-[0.5px] border-black ">
        <tr className="">
 {headingCollection.map((heading, index) => (
   <th
     className=" z-20 bg-gray-300 px-[2px] text-center text-sm font-semibold"
     key={index}
   >
     {heading}
   </th>
 ))}
</tr>
</thead>
<tbody className="border-[0.5px] border-black">
 {groupedData[time].map((item, index) => (
   <tr
     className="text-black mt-[2px]"
     key={index}
     style={getRowStyle(index, groupedData, time, noOfStrikes)}
   >
     <td className=" text-sm px-[3px] pt-[5px] text-center">
       {index + 1}
     </td>
     <td className=" text-sm  px-[3px] text-center">
       {item.underlyingValue}
     </td>

     <td
       className="border-black text-sm text-center px-[5px]"
       style={{
         background: blueShade(item.COI_Calls),
         ...yellow(index, "COI_Calls", groupedData, time)
       }}
     >
       {item.COI_Calls}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {item.Strike_Price}
     </td>
     <td
       className=" text-sm border-black text-center px-[3px]"
       style={{
         background: blueShade(item.COI_Puts),
         ...yellow(index, "COI_Puts", groupedData, time)
       }}
     >
       {item.COI_Puts}
     </td>
     <td className=" text-sm border-black text-center  px-[3px]">
       {item.C_Calls}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {item.C_Puts}
     </td>
     <td
       className=" text-sm border-black text-center px-[3px]"
       style={getCellStyle(index, "C_Amt_Calls_Cr", groupedData, time, noOfStrikes)}
     >
       {item.C_Amt_Calls_Cr}
     </td>
     <td
       className=" text-sm border-black text-center px-[3px]"
       style={getCellStyle(index, "C_Amt_Puts_Cr", groupedData, time, noOfStrikes)}
     >
       {item.C_Amt_Puts_Cr}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {getColumnData(index, "S_C_Calls", groupedData, time, noOfStrikes)}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {getColumnData(index, "S_C_Puts", groupedData, time, noOfStrikes)}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {getColumnData(index, "S_COI_Calls", groupedData, time, noOfStrikes)}
     </td>
     <td className="text-sm border-black text-center px-[3px]">
       {getColumnData(index, "S_COI_Puts", groupedData, time, noOfStrikes)}
     </td>
     <td className=" text-sm border-black text-center px-[3px]">
       {getColumnData(index, "R_S_COI", groupedData, time, noOfStrikes)}
     </td>
     <td
       className={` text-sm border-black text-center px-[3px] `}
       style={getBackgroundColor(item.Long_Short_Calls)}
     >
       {item.Long_Short_Calls}
     </td>
     <td
       className=" text-sm border-black text-center px-[3px]"
       style={getBackgroundColor(item.Long_Short_Puts)}
     >
       {item.Long_Short_Puts}
     </td>
   </tr>
 ))}
</tbody>
</table>
</div>
));

return <>{tables}</>;

}

export default DataTable





