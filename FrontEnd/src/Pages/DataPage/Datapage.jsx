import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import LineChart from "./Line_Chart";
import DropDown from "./DropDown";
import DataTable from "./DataTable";
import { localapi } from "../../Assets/config";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Context/AuthContext";


function DataPage() {

  const {isSubscribed , user , setUser, setIsSubscribed ,symbol ,setSymbol} = useContext(AuthContext);
  //  console.log(symbol)
  useEffect(()=>{
    if(user){
      axios.post(`${localapi}/issubscribed`, {email: user?.email}).then((result) => {
        console.log(result.data.data);
         if (typeof result.data.data !== 'string') {
           // If it's not a string, stringify it before storing in localStorage
           localStorage.setItem("isSubscribed", JSON.stringify(result.data.data));
       } else {
           // If it's already a string, directly store it in localStorage
           localStorage.setItem("isSubscribed", result.data.data);
       }
       setIsSubscribed(result.data.data)
     
      })
      .catch((err) => {
        console.log(err)
        // setUserExist(err.response.status)
      })
    }
      
    
  },[user])


  
  const [expiryDate, setExpiryDate] = useState("");
  const [noOfStrikes, setNoOfStrikes] = useState("12");
  const [timeRange, setTimeRange] = useState("15:15:00-15:30:00");
  const [allData, setAllData] = useState([]);
  const [pcrData, setPcrData] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);
  const [live, setLive] = useState();
  const [twoMin,setTwoMin]=useState()

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const isBetween930And1530 =
    (currentHour > 9 || (currentHour === 9 && currentMinutes >= 30)) &&
    (currentHour < 15 || (currentHour === 15 && currentMinutes <= 30));



useEffect(()=>{
  marketOpen()
},[twoMin])

const marketOpen = async () => {
  try {
    const response = await axios.get(`${localapi}/ismarketopen`);

    const data = response.data;
    console.log(data.status);
    setLive(data.status)
  } catch (error) {
    console.error("Error fetching market holiday", error);
  }
};

    const updateTwoMin=()=>{
      const currentTime=new Date()
      setTwoMin(currentTime)
    }
 
    useEffect(()=>{
      const intervalid=setInterval(() => {
        updateTwoMin()
      }, 30*1000);
      return () => clearInterval(intervalid);
    })

  // fetch all data
  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes && timeRange) {
      fetchData();
    }
  }, [symbol, expiryDate, noOfStrikes, timeRange]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${localapi}/all`, {
        symbol,
        expiryDate,
        noOfStrikes,
        timeRange,
      });

      const data = response.data;
      setAllData(data.data);
      //console.log(allData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch pcr data
  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes) {
      fetchPcrData();
    }
  }, [symbol, expiryDate, noOfStrikes,timeRange,twoMin]);

  const fetchPcrData = async () => {
    try {
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

  // console.log(allData)

  // Iterate through the allData array to find the maximum values
  if (Array.isArray(allData) && allData.length > 0) {
    // Initialize variables to store the maximum values
    var maxUnderlyingValue = -Infinity;
    var maxTime = "";
    const len=(allData.length)
    maxTime=allData[len-1].Time;
    maxUnderlyingValue=allData[len-1].underlyingValue

    // Iterate through the allData array to find the maximum values
    // allData.forEach((data) => {
    //   // Check if the current underlyingValue is greater than the current maxUnderlyingValue
    //   if (data.underlyingValue > maxUnderlyingValue) {
    //     maxUnderlyingValue = data.underlyingValue;
    //     maxTime = data.Time;
    //   }
    // });

    // Now maxUnderlyingValue contains the maximum underlyingValue and maxTime contains the corresponding Time
  }

  // console.log(allData);
  return (
    <div>

  <Navbar/>
    <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full   font-bold text-md sm:text-4xl  my-1 mb-4">
        PCR - RideOnWhale.Com
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
          twoMin={twoMin}
        />
      </div>

      <div className=" w-full h-auto flex flex-col justify-center mt-[20px]">
        <h1 className=" self-center text-xl font-bold mb-[10px]">
          Table Of Data
        </h1>
        <h2 className=' font-semibold text-3xl mb-2 '>{symbol}</h2>
        {isBetween930And1530 ? (
          <div className="flex items-center gap-[10px] ml-[12px]">
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

        <div className="py-[30px] px-[10px] flex-col flex sm:flex-row gap-10">
        
          {/* its come from Pages/DataPage/Line_Chart */}
          <LineChart data={pcrData} />
        </div>

        <div className="">
          <DataTable allData={allData} noOfStrikes={noOfStrikes} />
        </div>

      </div>
    </div>
    </div>
  );
}

export default DataPage;
