import React from 'react';
import { BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraph = ({ item }) => {
  const PC_Calls = item.PC_Calls.toFixed(3);
  const PC_Puts = item.PC_Puts.toFixed(3);

  return (
  <ResponsiveContainer >
  <BarChart 
      barSize={45} 
      data={[{ PC_Calls, PC_Puts }]}
      layout='vertical'
      margin={{ top: -1, right: -1, left: -61, bottom: -31 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
  <XAxis tick={false}  type="number" />
  <YAxis dataKey="name" type="category" />

  <Tooltip contentStyle={{ fontSize: '15px' }} />
  <Bar dataKey="PC_Calls" fill="#8884d8" name={false} />
  <Bar dataKey="PC_Puts" fill="orange"  name={false}/>
      </BarChart>
  </ResponsiveContainer>
      

  );
};

export default BarGraph;
