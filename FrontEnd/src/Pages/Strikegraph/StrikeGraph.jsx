import {React,useState,useEffect} from 'react'
import DropDown from "./DropDown";
import axios from "axios";
import  LineChartsCallsPuts  from './LineChartsCallsPuts';
import { localapi } from '../../Assets/config';
// import  LineChartsPuts  from './LineChartsPuts';
// import LineChartPrice from "./LineChartPrice";


const StrikeGraph = () => {

    const [symbol, setSymbol] = useState("BANKNIFTY");
    const [expiryDate, setExpiryDate] = useState("");
    const [noOfStrikes, setNoOfStrikes] = useState("12");
    const [timeInterval, setTimeInterval] = useState("2");
    const [strikePrice, setStrikePrice] = useState("");
    const [strikePriceHigh, setStrikePriceHigh] = useState("");
    const [strikePriceData, setStrikePriceData] = useState([]);
    const [strikegraphData, setStrikegraphData] = useState([]);
    const [expiryDates, setExpiryDates] = useState([]);

    
    // strikegraph data api

    useEffect(() => {
        if (symbol && expiryDate && strikePrice && timeInterval) {
          fetchData();
        }
      }, [symbol, expiryDate, strikePrice, timeInterval]);
    
      const fetchData = async () => {
        try {
          const response = await axios.post(`${localapi}/strikegraph`, {
            symbol,
            expiryDate,
            strikePrice,
            timeInterval,
          });
          const data = response.data;
          setStrikegraphData(data.data);
          //  console.log(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // strike price api call 
      useEffect(() => {
        if (symbol && expiryDate && noOfStrikes ) {
          fetchStrikepriceData();
        }
      }, [symbol, expiryDate, noOfStrikes]);
    

      //strike price api call
      const fetchStrikepriceData = async () => {
        try {
          const response = await axios.post(`${localapi}/strikeprices`, {
            symbol,
            expiryDate,
            noOfStrikes,
          });
    
          const data = response.data
          setStrikePriceData(data.data);
          setStrikePrice(data.data[0])
          setStrikePriceHigh(data.data[noOfStrikes*2-1])
          console.log(strikePrice);
          console.log(strikePriceHigh)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

 

      // expiredate api 
      useEffect(() => {
        if (symbol) {
          fetchExpiryDates();
        }
      }, [symbol]);
    
      //for expiry dates
      const fetchExpiryDates = async () => {
        try {
          const response = await axios.post(`${localapi}/expirydates`, {
            symbol,
          });
    
          const data = response.data;
          // console.log(data.data);
          setExpiryDates(data.data);
          setExpiryDate(data.data[0])
        } catch (error) {
          console.error("Error fetching expiry dates:", error);
        }
      };

//  console.log(strikegraphData);


  return (
    <>
 <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full   font-bold text-md sm:text-4xl  my-1 mb-4">
        Option Chain Data - RideOnWhale.Com
      </h1>
      <div className="  w-full h-auto px-[0px] sm:p-[10px] flex gap-[10px] justify-between flex-wrap">
        {/* its come from pages/DataPage/DropDown */}
        <DropDown
          symbol={symbol}
          expiryDate={expiryDate}
          noOfStrikes={noOfStrikes}
          timeInterval={timeInterval}
          expiryDates={expiryDates}
          setTimeInterval={setTimeInterval}
          setStrikegraphData={setStrikegraphData}
          setExpiryDate={setExpiryDate}
          setExpiryDates={setExpiryDates}
          setNoOfStrikes={setNoOfStrikes}
          setSymbol={setSymbol}
          strikePriceData={strikePriceData}
          strikePrice={strikePrice}
          setStrikePrice={setStrikePrice}
        />

      </div>
        <div className="py-[30px] px-[10px] flex flex-col">
          {/* its come from Pages/strike graph page/Bargraph */}
          <h2 className=' text-center text-2xl mb-2 '>LTP Calls And Puts Graph</h2>
          <LineChartsCallsPuts data={strikegraphData} strikePriceData={strikePriceData} strikePrice={strikePrice} strikePriceHigh={strikePriceHigh}  />
        </div>
      </div>    </>
  )
}

export default StrikeGraph