import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./Line_Chart";
import DropDown from "./DropDown";
import DataTable from "./DataTable";

function DataPage() {
  const [symbol, setSymbol] = useState("BANKNIFTY");
  const [expiryDate, setExpiryDate] = useState("");
  const [noOfStrikes, setNoOfStrikes] = useState("12");
  const [timeRange, setTimeRange] = useState("10:15:00-10:45:00");
  const [allData, setAllData] = useState([]);
  const [pcrData, setPcrData] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);
  const [live, setLive] = useState();

  // fetch all data
  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes && timeRange) {
      fetchData();
    }
  }, [symbol, expiryDate, noOfStrikes, timeRange]);

  const fetchData = async () => {
    try {
      const localapi = "http://127.0.0.1:5000";
     // const api = "https://7bd5-103-159-35-25.ngrok-free.app";
      const ngrokApi="https://8a61-2405-201-6801-20ac-5c6b-8fe4-b02b-f692.ngrok-free.app"
      const response = await axios.post(`${localapi}/all`, {
        symbol,
        expiryDate,
        noOfStrikes,
        timeRange,
      });

      const data = response.data;
      setAllData(data.data);
      console.log(allData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch pcr data
  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes) {
      fetchPcrData();
    }
  }, [symbol, expiryDate, noOfStrikes]);

  const fetchPcrData = async () => {
    try {
      const localapi = "http://127.0.0.1:5000";
      //const api = "https://7bd5-103-159-35-25.ngrok-free.app";
      const ngrokApi="https://8a61-2405-201-6801-20ac-5c6b-8fe4-b02b-f692.ngrok-free.app"
      const response = await axios.post(`${localapi}/pcr`, {
        symbol,
        expiryDate,
        noOfStrikes,
      });

      const data = response.data;
      // setTableData(data.data);
      setPcrData(data.data);
      // console.log(data.data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch expiredates data
  useEffect(() => {
    if (symbol) {
      fetchExpiryDates();
    }
  }, [symbol]);

  const fetchExpiryDates = async () => {
    try {
      const localapi = "http://127.0.0.1:5000";
     // const api = "https://7bd5-103-159-35-25.ngrok-free.app";
      const ngrokApi="https://8a61-2405-201-6801-20ac-5c6b-8fe4-b02b-f692.ngrok-free.app"
      const response = await axios.post(`${localapi}/expirydates`, {
        symbol,
      });

      const data = response.data;
      // console.log(data.data);
      setExpiryDates(data.data);
      setExpiryDate(data.data[0]);
    } catch (error) {
      console.error("Error fetching expiry dates:", error);
    }
  };

  // Iterate through the allData array to find the maximum values
  if (Array.isArray(allData) && allData.length > 0) {
    // Initialize variables to store the maximum values
    var maxUnderlyingValue = -Infinity;
    var maxTime = "";

    // Iterate through the allData array to find the maximum values
    allData.forEach((data) => {
      // Check if the current underlyingValue is greater than the current maxUnderlyingValue
      if (data.underlyingValue > maxUnderlyingValue) {
        maxUnderlyingValue = data.underlyingValue;
        maxTime = data.Time;
      }
    });

    // Now maxUnderlyingValue contains the maximum underlyingValue and maxTime contains the corresponding Time
  }

  // console.log(allData);
  return (
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
          timeRange={timeRange}
          expiryDates={expiryDates}
          setAllData={setAllData}
          setExpiryDate={setExpiryDate}
          setTimeRange={setTimeRange}
          setExpiryDates={setExpiryDates}
          setNoOfStrikes={setNoOfStrikes}
          setSymbol={setSymbol}
          live={live}
          setLive={setLive}
        />
      </div>

      <div className=" w-full h-auto flex flex-col justify-center mt-[20px]">
        <h1 className=" self-center text-xl font-bold mb-[10px]">
          Table Of Data
        </h1>
        {live ? (
          <div className="flex   items-center gap-[10px] ml-[12px]">
            {" "}
            <h1 className=" text-lg font-semibold ">Live</h1>
            <div className="flex items-center justify-center">
              {" "}
              <div className=" w-[10px] h-[10px] rounded-[50%] bg-green-400  animate-ping "></div>
              <div className="w-[7px] h-[7px] rounded-[50%] bg-green-800 absolute"></div>
            </div>
          </div>
        ) : null}
        {maxUnderlyingValue !== -Infinity && (
          <div className="">
            <h2 className="text-2xl font-semibold mb-2">
              {maxUnderlyingValue}
            </h2>
            <p className="text-sm">{maxTime}</p>
          </div>
        )}

        <div className="py-[30px] px-[10px] flex-col flex sm:flex-row  gap-10">
          {/* its come from Pages/DataPage/Line_Chart */}
          <LineChart data={pcrData} />
        </div>

        <div className="">
          <DataTable allData={allData} setAllData={setAllData} />
        </div>

      </div>
    </div>
  );
}

export default DataPage;
