import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartsCalls = ({ data,strikePriceData, strikePrice, strikePriceHigh }) => {
    console.log(data)
    // console.log(strikePriceHigh)
  // if (!Array.isArray(data) || data.length === 0) {
  //     return <h1>Data Not Found</h1>; // or some fallback JSX if needed
  //   }
  // Calculate the domain for Y-axis based on data range
  const minYValueCALL = Math.min(
    ...(Array.isArray(data) ? data.map((item) => item.LTP_Calls) : [])
  );
  const minValueCALL = minYValueCALL - 20;
  const maxYValueCALL = Math.max(
    ...(Array.isArray(data) ? data.map((item) => item.LTP_Calls) : [])
  );
  const maxValueCALL = maxYValueCALL + 20;

  // Calculate the domain for Y-axis based on data range
  const minYValuePUT = Math.min(
    ...(Array.isArray(data) ? data.map((item) => item.LTP_Puts) : [])
  );
  const minValuePUT = minYValuePUT - 0.5;
  const maxYValuePUT = Math.max(
    ...(Array.isArray(data) ? data.map((item) => item.LTP_Puts) : [])
  );
  const maxValuePUT = maxYValuePUT + 0.5;

  //strike price

  const minYValueUnderlyingValue = Math.min(
    ...(Array.isArray(data) ? data.map((item) => item.underlyingValue) : [])
  );
  const minValueUnderlyingValue = minYValueUnderlyingValue - 0.5;
  const maxYValueUnderlyingValue = Math.max(
    ...(Array.isArray(data) ? data.map((item) => item.underlyingValue) : [])
  );
  const maxValueUnderlyingValue = maxYValueUnderlyingValue + 0.5;


  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
        data2={Array.isArray(strikePriceData) && strikePriceData.length>0 && strikePriceData} 
        data={Array.isArray(data) && data.length > 0 && data}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="Time" />
        <YAxis yAxisId="left" domain={[minValueCALL, maxValueCALL]} /> 
        <YAxis yAxisId="third" domain={[minValueUnderlyingValue, maxValueUnderlyingValue]} />
        <YAxis yAxisId="right" domain={[minValuePUT, maxValuePUT]} orientation="right"/>

          <Tooltip />
          <Legend />
           <Line
            type="monotone"
            dataKey="LTP_Calls"
            yAxisId="left"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          /> 
          
          <Line
            type="monotone"
            dataKey="LTP_Puts"
            yAxisId="right"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            dot={false}
          />
           <Line
            type="monotone"
            dataKey="underlyingValue"
            yAxisId="third"
            stroke="red"
            activeDot={{ r: 8 }}
            dot={false}
          /> 
            
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartsCalls;
