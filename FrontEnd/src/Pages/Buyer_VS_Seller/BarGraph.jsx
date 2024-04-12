import React from 'react';
import { BarChart, Bar, XAxis,YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ BuyerData,SellerData }) => {
 

  return (
    <div>
      <BarChart 
      width={200} 
      height={150} 
      barSize={30}  
      data={[{BuyerData, SellerData }]}
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
    </div>
  );
};

export default BarGraph;
