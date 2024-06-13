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
  setDate,
  live,
  setLive,
  twoMin,
  setTimeRange,
  timeRange
}) => {
  
  const noOfStrikesOptions = [12, 14, 16, 18, 20];

  const symbolsCollection = ["NIFTY", "FINNIFTY", "BANKNIFTY", "MIDCPNIFTY"];
  // const stocksCollection = [
  //   "KOTAKBANK",
  //   "HDFCBANK",
  //   "SBIN",
  //   "BANDHANBNK",
  //   "AXISBANK",
  //   "IDFCFIRSTB",
  //   "AUBANK",
  //   "PNB",
  //   "FEDERALBNK",
  //   "INDUSINDBK",
  //   "BANKBARODA",
  //   "ICICIBANK",
  //   "RELIANCE",
  //   "INFY",
  //   "TCS",
  //   "ITC",
  //   "LT",
  //   "HINDUNILVR",
  //   "BAJFINANCE",
  //   "BHARTIARTL",
  // ];
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
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  
  const [time30MinutesAgo, setTime30MinutesAgo] = useState(
    getFormattedTime(new Date(Date.now() - 30 * 60 * 1000))
  );


  useEffect(() => {
    setCurrentTime(getFormattedTime());
    setTime30MinutesAgo(getFormattedTime(new Date(Date.now() - 30 * 60 * 1000)));
  }, [twoMin]); // Run only once when the component mounts

  function getFormattedTime(date = new Date()) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = "00";
    return `${hours}:${minutes}:${seconds}`;
  }

  if(live){
    let currentRange=`${time30MinutesAgo}-${currentTime}`
    setTimeRange(currentRange);
  }
  
   useEffect(() => {
    if(live){
      let currentRange=`${time30MinutesAgo}-${currentTime}`
      setTimeRange(currentRange); 
    }
   }, [twoMin]);

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const isBetween930And1530 =
    (currentHour > 9 || (currentHour === 9 && currentMinutes >= 30)) &&
    (currentHour < 15 || (currentHour === 15 && currentMinutes <= 30));

    const timeRangesCollection = [
      "09:15:00-09:45:00",
      "09:45:00-10:15:00",
      "10:15:00-10:45:00",
      "10:45:00-11:15:00",
      "11:15:00-11:45:00",
      "11:45:00-12:15:00",
      "12:15:00-12:45:00",
      "12:45:00-13:15:00",
      "13:15:00-13:45:00",
      "13:45:00-14:15:00",
      "14:15:00-14:45:00",
      "14:45:00-15:15:00",
      "15:15:00-15:30:00",
    ];



  const intervalCollection = [
    "2",
    "4",
    "6",
    "8",
    "10",
  ];


//   useEffect(() => {
//     let currentRange=`${time30MinutesAgo} - ${currentTime}`
//     if (timeRange === currentRange) {
//       setLive(true);
//     } else {
//       setLive(false);
//     }
//   }, [timeRange]);
   
  
 
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
      {/* {!live && ( 
<div className="flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select Time Range
        </label>
        <select
          className=" px-[10px] py-[5px] bg-gray-300 focus:outline-none rounded-md "
          value={timeRange}

          onChange={(e) => setTimeRange(e.target.value)}
        >
           <option defaultValue>15:15:00-15:30:00</option> 
          {timeRangesCollection.map((range, index) => (
            <option key={index} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>
    )}  */}

     {!live && ( 
<div className="flex flex-col">
        <label className="text-md font-semibold" htmlFor="">
          Select Date
        </label>
        <input
        type="date"
        className="px-[20px] py-[2px] bg-gray-300 focus:outline-none rounded-md"
        onChange={(e) => setDate(e.target.value)}
        />
       
      </div>
    )}

      {isBetween930And1530 && (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            id="liveCheckbox"
            checked={live}
            onChange={(e) => {
              setLive(e.target.checked);
              if (e.target.checked) {
                setTimeRange(`${time30MinutesAgo}-${currentTime}`);
              } else {
                setTimeRange("");
              }
            }}
            className="mr-2 h-[20px] w-[20px]"
          />
          <label className="text-2xl font-semibold text-green-800" htmlFor="liveCheckbox">Live</label>
        </div>
      )}
     
    </>
  );
};

export default DropDown;
