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
  // Calculate the domain for Y-axis based on data range
  const minYValue = Math.min(
    ...(Array.isArray(data) ? data.map((item) => Math.min(item.S_OI_Calls, item.S_OI_Puts)) : [])
  );
  const minValue = minYValue - 100000000; // Subtract 100 million for some padding
  const maxYValue = Math.max(
    ...(Array.isArray(data) ? data.map((item) => Math.max(item.S_OI_Calls, item.S_OI_Puts)) : [])
  );
  const maxValue = maxYValue + 100000000; // Add 100 million for some padding

  // Function to format large numbers
  const formatYAxis = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={Array.isArray(data) && data.length > 0 && data}>
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
            dataKey="S_OI_Calls"
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
    </>
  );
};

export default OIGraph;