import React from 'react';
import { BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarGraph = ({ BuyerData,SellerData }) => {
 

  return (
  <ResponsiveContainer>
 <BarChart 
      barSize={20}  
      data={[{BuyerData, SellerData }]}
      margin={{ top: -1, right: -1, left: -61, bottom: -31 }} 
      layout='vertical'
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis tick={false} type='number' tickLine={false}/>
        <YAxis dataKey="name" type="category" />
        <Tooltip  contentStyle={{ fontSize: '15px'  }}/>
        {/* <Legend wrapperStyle={{ fontSize: '10px'}} /> */}
        <Bar dataKey="BuyerData" fill="#8884d8" />
        <Bar dataKey="SellerData" fill="orange"  />
      </BarChart>
  </ResponsiveContainer>
     

  );
};

export default BarGraph;
