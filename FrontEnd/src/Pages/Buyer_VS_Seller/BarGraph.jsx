import React from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarGraph = ({ BuyerData,SellerData }) => {
 

  return (
    <div>
      <BarChart width={200} height={150} barSize={30}  data={[{ name: "Buyer & Seller", BuyerData, SellerData }]}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip  contentStyle={{ fontSize: '10px'  }}/>
        <Legend wrapperStyle={{ fontSize: '10px'}} />
        <Bar dataKey="BuyerData" fill="#8884d8" name="Buyer" />
        <Bar dataKey="SellerData" fill="orange" name="Seller" />
      </BarChart>
    </div>
  );
};

export default BarGraph;
