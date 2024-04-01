import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ item }) => {
  const PC_Calls = item.PC_Calls.toFixed(3);
  const PC_Puts = item.PC_Puts.toFixed(3);

  return (
    <div>
      <BarChart width={100} height={150} barSize={30}  data={[{ name: "Calls & Puts", PC_Calls, PC_Puts }]}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip  contentStyle={{ fontSize: '10px'  }}/>
        <Legend wrapperStyle={{ fontSize: '10px'}} />
        <Bar dataKey="PC_Calls" fill="#8884d8" name="PC Calls" />
        <Bar dataKey="PC_Puts" fill="orange" name="PC Puts" />
      </BarChart>
    </div>
  );
};

export default BarGraph;
