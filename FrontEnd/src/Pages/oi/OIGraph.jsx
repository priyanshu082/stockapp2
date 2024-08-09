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

const OIGraph = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  // Calculate min and max values for Y-axis
  const minYValue = Math.min(
    ...data.map((item) => Math.min(item.OpenInterest_Calls, item.S_OI_Puts))
  );
  const maxYValue = Math.max(
    ...data.map((item) => Math.max(item.OpenInterest_Calls, item.S_OI_Puts))
  );

  // Calculate padding as a percentage of the data range
  const range = maxYValue - minYValue;
  const padding = 0 ; // 10% padding

  const minValue = minYValue - 10000;
  const maxValue = maxYValue + 10000;

  // Function to format large numbers
  const formatYAxis = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="Date" 
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          domain={[minValue, maxValue]} 
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          labelFormatter={(value) => new Date(value).toLocaleDateString()}
          formatter={(value) => new Intl.NumberFormat().format(value)}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="OpenInterest_Calls"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Calls OI"
        />
        <Line
          type="monotone"
          dataKey="S_OI_Puts"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
          name="Puts OI"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OIGraph;
