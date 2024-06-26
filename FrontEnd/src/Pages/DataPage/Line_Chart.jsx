// LineChart.js
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
  ReferenceLine,
} from "recharts";

const Line_Chart = ({ data }) => {
  // Calculate the domain for Y-axis UNDERLINGVALUE based on data range
  const minYValue = Math.min(
    ...(Array.isArray(data) ? data.map((item) => item.underlyingValue) : [])
  );
  const minValue = minYValue - 20;
  const maxYValue = Math.max(
    ...(Array.isArray(data) ? data.map((item) => item.underlyingValue) : [])
  );
  const maxValue = maxYValue + 20;

  // Calculate the domain for Y-axis RSCOI based on data range
  const minYValueCOI = Math.min(
    ...(Array.isArray(data) ? data.map((item) => item.R_S_COI) : [])
  );
  // const minValueCOI = minYValueCOI;
  const maxYValueCOI = Math.max(
    ...(Array.isArray(data) ? data.map((item) => item.R_S_COI) : [])
  );
  // const maxValueCOI = maxYValueCOI;

  return (
    <>
      <ResponsiveContainer  width="100%" height={450}>
        <LineChart data={Array.isArray(data) && data.length > 0 && data}>
          <CartesianGrid  strokeDasharray="1 1" />
          <XAxis dataKey="Time" />
          <YAxis
            yAxisId="right"
            domain={[0, 2]}
            orientation="right"
          />
          {/* <YAxis yAxisId="right" domain={[1, 1]} /> */}
          <Tooltip />
          <Legend />
          <ReferenceLine yAxisId="right" y={1} stroke="red" />
          <Line
            type="monotone"
            dataKey="R_S_COI"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
            yAxisId="right"
          />
          {/* Adding second line based on 'underlyingValue'
          <Line
            type="monotone"
            dataKey="1"
            // strokeWidth={2}
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            dot={false}
            yAxisId="right"
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
export default Line_Chart;
