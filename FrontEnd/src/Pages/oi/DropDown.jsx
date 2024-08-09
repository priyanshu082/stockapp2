import { React, useEffect, useState } from "react";
import axios from "axios";
import { localapi } from "../../Assets/config";


const DropDown = ({
  timeRange,
  noOfStrikes,
  symbol,
  setNoOfStrikes,
  setSymbol,
  setTimeRange,
  expiryDate,
  setExpiryDate,
  expiryDates,
  setExpiryDates,
}) => {
  
  const noOfStrikesOptions = [12, 14, 16, 18, 20];
  const timeRangeValue=["daily","weekly","monthly"]
  const symbolsCollection = ["NIFTY", "FINNIFTY", "BANKNIFTY", "MIDCPNIFTY"];
  const [stocksCollection, setstocksCollection] = useState([])

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const filteredDates = expiryDates.filter(date => date >= currentDate);
    setExpiryDates(filteredDates);
  }, [expiryDates, setExpiryDates]);
  

  useEffect(()=>{
    fetchCollection();
  },[])

  const fetchCollection=async()=>{
    try {
      const res= await axios.get(`${localapi}/stocks`)
      setstocksCollection(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

 
  return (
    <>
      <div className=" flex flex-col flex-wrap">
        <label className="text-md font-semibold" htmlFor="">
          Select The Symbol
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {symbolsCollection.map((symbolItem, index) => (
            <option key={index} value={symbolItem}>
              {symbolItem}
            </option>
          ))}
        </select>
      </div>

      <div className=" flex flex-col flex-wrap">
        <label className="text-md font-semibold" htmlFor="">
          Select The Stock
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {stocksCollection.map((symbolItem, index) => (
            <option key={index} value={symbolItem}>
              {symbolItem}
            </option>
          ))}
        </select>
      </div>

       <div className="  flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select Expire Date
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {/* <option value='2024-02-29'>2024-02-29</option>  */}
          {Array.isArray(expiryDates) && expiryDates.length>0 && expiryDates.map((expiryDateItem, index) => (
            <option key={index} value={expiryDateItem}>
              {expiryDateItem}
            </option>
          ))}
        </select>
      </div>
      

      <div className="  flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select No Of Strike
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md"
          value={noOfStrikes}
          onChange={(e) => setNoOfStrikes(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {noOfStrikesOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="  flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select Time Range
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {timeRangeValue.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropDown;
