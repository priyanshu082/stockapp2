import { React, useEffect, useState } from "react";
import axios from "axios";
import { localapi } from "../../Assets/config";

const DropDown = ({
  timeInterval,
  noOfStrikes,
  symbol,
  expiryDate,
  setExpiryDate,
  setNoOfStrikes,
  setSymbol,
  setTimeInterval,
  expiryDates,
  strikePriceData,
  setStrikePrice,
  strikePrice
}) => {
  const noOfStrikesOptions = [12, 14, 16, 18, 20];

  const symbolsCollection = ["NIFTY", "FINNIFTY", "BANKNIFTY", "MIDCPNIFTY"];
  const [stocksCollection, setstocksCollection] = useState([])

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


  const intervalCollection = [
    "2",
    "4",
    "6",
    "8",
    "10",
  ];
  
 
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
          {Array.isArray(expiryDates) && expiryDates.map((expiryDateItem, index) => (
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
          Select Strike Price
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={strikePrice}
          onChange={(e) => setStrikePrice(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {Array.isArray(strikePriceData) && strikePriceData.map((strikePriceItem, index) => (
            <option key={index} value={strikePriceItem}>
              {strikePriceItem}
            </option>
          ))}
        </select>
      </div>

      
      <div className="  flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select Time Interval
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={timeInterval}
          onChange={(e) => setTimeInterval(e.target.value)}
        >
          <option value="">Choose an Option</option>
          {intervalCollection.map((interval, index) => (
            <option key={index} value={interval}>
              {interval}
            </option>
          ))}
        </select>
      </div>
     
    </>
  );
};

export default DropDown;
