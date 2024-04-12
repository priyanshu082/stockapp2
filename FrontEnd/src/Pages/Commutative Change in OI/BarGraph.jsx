import React from 'react';
import { BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ item }) => {
  const PC_Calls = item.PC_Calls.toFixed(3);
  const PC_Puts = item.PC_Puts.toFixed(3);

  return (
  
      <BarChart 
      width={150} 
      height={150} 
      barSize={30}  
      data={[{ PC_Calls, PC_Puts }]}
      layout='vertical'
      >
        <CartesianGrid strokeDasharray="1 1" />
  <XAxis tick={false}  type="number" />
  <YAxis dataKey="name" type="category" />
  <Tooltip contentStyle={{ fontSize: '15px' }} />
  <Bar dataKey="PC_Calls" fill="#8884d8"  />
  <Bar dataKey="PC_Puts" fill="orange"  />
      </BarChart>

  );
};

export default BarGraph;
