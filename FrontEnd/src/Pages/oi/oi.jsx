import React, { useEffect, useState } from 'react'
import { localapi } from '../../Assets/config';
import axios from 'axios';
import Navbar from "../../Components/Navbar/Navbar"
import DropDown from './DropDown';
import OIGraph from './OIGraph';

const OI = () => {

    const [data,setData]=useState()
    const [symbol,setSymbol]=useState("BANKNIFTY")
    const [timeInterval,setTimeInterval]=useState("daily")
    const [noOfStrikes,setNoOfStrikes]=useState("12")

    const fetchData = async () => {
        try {
          const response = await axios.post(`${localapi}/oi`, {
            symbol,
            noOfStrikes,
            timeInterval
          });
    
          const data = response.data;
          console.log(response.data.data)
          setData(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(()=>{
        fetchData()
      },[symbol,noOfStrikes,timeInterval])


  return (
    <div>
  <Navbar/>
    <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full   font-bold text-md sm:text-4xl  my-1 mb-4">
        OI - RideOnWhale.Com
      </h1>
      <div className="  w-full h-auto px-[0px] sm:p-[10px] flex gap-[10px] justify-between flex-wrap">
        {/* its come from pages/DataPage/DropDown */}
        <DropDown
          symbol={symbol}
          noOfStrikes={noOfStrikes}
          timeRange={timeInterval}
          setTimeRange={setTimeInterval}
          setNoOfStrikes={setNoOfStrikes}
          setSymbol={setSymbol}
        />
      </div>
      <div className="py-[30px] px-[5px] flex flex-col">
          {/* its come from Pages/strike graph page/Bargraph */}
          <h2 className=' text-center font-semibold text-3xl mb-2 '>{symbol}</h2>
          <h2 className=' text-center text-2xl mb-2 '>COI Calls And Puts Graph</h2>
          <div className='flex flex-col gap-10 md:gap-[0] md:flex-row justify-between mt-[50px]'>

          <OIGraph data={data} />
          
          </div>
        </div>

    
    </div>
    </div>
  )
}

export default OI