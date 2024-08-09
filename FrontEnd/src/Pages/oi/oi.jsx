import React, { useEffect, useState } from 'react';
import { localapi } from '../../Assets/config';
import axios from 'axios';
import Navbar from "../../Components/Navbar/Navbar";
import DropDown from './DropDown';
import OIGraph from './OIGraph';
import { DNA } from 'react-loader-spinner';

const OI = () => {
  const [data, setData] = useState();
  const [symbol, setSymbol] = useState("BANKNIFTY");
  const [timeInterval, setTimeInterval] = useState("daily");
  const [noOfStrikes, setNoOfStrikes] = useState("12");
  const [expiryDates, setExpiryDates] = useState([]);
  const [expiryDate, setExpiryDate] = useState("");
  const [loadingExpiryDates, setLoadingExpiryDates] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const fetchExpiryDates = async () => {
    try {
      const response = await axios.post(`${localapi}/allexpirydates`, { symbol });
      const data = response.data;
       console.log(data.data);
      setExpiryDates(data.data);
      setExpiryDate(data.data[0]);
      setLoadingExpiryDates(false);
    } catch (error) {
      console.error("Error fetching expiry dates:", error);
      setLoadingExpiryDates(false);
    }
  };

  useEffect(() => {
    fetchExpiryDates();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${localapi}/oi`, { symbol, noOfStrikes, timeInterval, expiryDate });
      const data = response.data;
      // console.log(response.data.data);
      setData(data.data);
      setLoadingData(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (expiryDate) {
      setLoadingData(true);
      fetchData();
    }
  }, [symbol, noOfStrikes, timeInterval, expiryDate]);

  return (
    <div className='flex flex-col w-[100%] overflow-hidden'>
      <Navbar />
     <div className="flex flex-col items-center justify-center ">
      {loadingExpiryDates ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="text-center flex justify-center items-center">
          <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
          
          </div>
        </div>
      ) : (
        <div className="w-full mx-[2vw] mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4 my-[2vw] ">CUMULATIVE OI </h1>
          <div className="w-full h-auto px-[0px] sm:p-[10px] flex gap-[10px] justify-between flex-wrap">
            <DropDown
              symbol={symbol}
              noOfStrikes={noOfStrikes}
              timeRange={timeInterval}
              setTimeRange={setTimeInterval}
              setNoOfStrikes={setNoOfStrikes}
              setSymbol={setSymbol}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              expiryDates={expiryDates}
              setExpiryDates={setExpiryDates}
            />
          </div>
          {loadingData ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
              <DNA
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  />
                
              </div>
            </div>
          ) : (
            <div className='mt-[4vw]  flex flex-col'>
              <h2 className="text-xl font-semibold mb-4">{symbol}</h2>
              <OIGraph data={data} />
            </div>
          )}
        </div>
      )}
    </div>
    </div>
   
  );
};

export default OI;
