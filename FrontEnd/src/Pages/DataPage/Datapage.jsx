import React, { useState, useEffect,useContext } from "react"
import axios from "axios"
import LineChart from "./Line_Chart"
import DropDown from "./DropDown"
import DataTable from "./DataTable"
import { localapi } from "../../Assets/config"
import Navbar from "../../Components/Navbar/Navbar"
import { AuthContext } from "../../Context/AuthContext"
import InfiniteMoving from "../../Components/InfiniteMoving"


function DataPage() {

  const {isSubscribed , user , setUser, setIsSubscribed ,symbol ,setSymbol} = useContext(AuthContext);
  //  console.log(symbol)
  useEffect(()=>{
    if(user){
      axios.post(`${localapi}/issubscribed`, {email: user?.email}).then((result) => {
     
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



  const [isDownloading, setIsDownloading] = useState(false);
  
    const downloadData = async () => {
      try {
        setIsDownloading(true)
        const res = await axios.post(`${localapi}/download`, {
          symbol,
          expiryDate,
          noOfStrikes,
          date
        });
        const htmlData = res.data;

        // Create a Blob from the HTML data
        const blob = new Blob([htmlData], { type: 'text/html;charset=utf-8' });
  
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
  
        // Create a temporary anchor element
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = 'data.html';
        tempLink.click();
  
        // Clean up the temporary URL object
        URL.revokeObjectURL(url);
    } catch (error) {
      console.log('Error downloading', error);
    } finally {
      setIsDownloading(false);
    }
    };
  
    const handleDownloadClick = () => {
      downloadData();
    };
  
  const [expiryDate, setExpiryDate] = useState("");
  const [noOfStrikes, setNoOfStrikes] = useState("12");
  const [timeRange, setTimeRange] = useState("15:15:00-15:30:00");
  const [allData, setAllData] = useState([]);
  const [pcrData, setPcrData] = useState([]);
  const [expiryDates, setExpiryDates] = useState([]);
  const [twoMin,setTwoMin]=useState("")
  const [date,setDate]=useState("")
  const [live, setLive] = useState();







const marketOpen = async () => {
  try {
    const response = await axios.get(`${localapi}/ismarketopen`);
    const data = response.data;
    setLive(data.status)
  } catch (error) {
    console.error("Error fetching market holiday", error);
  }
};

useEffect(()=>{
  marketOpen()
},[twoMin])



   const currentHour = new Date().getHours();
   const currentMinutes = new Date().getMinutes();
   const isBetween930And1530 =
     (currentHour > 9 || (currentHour === 9 && currentMinutes >= 30)) &&
    (currentHour < 15 || (currentHour === 15 && currentMinutes <= 30));

    const updateTwoMin=()=>{
      const currentTime=new Date()
      setTwoMin(currentTime)
      console.log(currentTime,twoMin)
    }
 
    useEffect(()=>{
      if(live){
        const intervalid=setInterval(() => {
          updateTwoMin()
        }, 40000);
        return () => clearInterval(intervalid);
      }
    })


  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes && timeRange) {
      fetchData();
    }
  }, [symbol, expiryDate, noOfStrikes, timeRange,date,twoMin]);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${localapi}/all`, {
        symbol,
        expiryDate,
        noOfStrikes,
        timeRange,
        date
      });

      const data = response.data;
      console.log(response)
      setAllData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch pcr data
  useEffect(() => {
    if (symbol && expiryDate && noOfStrikes) {
      fetchPcrData();
    }
  }, [symbol, expiryDate, noOfStrikes,timeRange,twoMin,date]);

  const fetchPcrData = async () => {
    try {
      const response = await axios.post(`${localapi}/pcr`, {
        symbol,
        expiryDate,
        noOfStrikes,
        date
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
  }, [symbol,date]);


  const fetchExpiryDates = async () => {
    try {
      const response = await axios.post(`${localapi}/expirydates`, {
        symbol,
        date
      });

      const data = response.data;
      console.log(data.data);
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
        MOVEMENT TRACKER
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
          setDate={setDate}
        />
      </div>
     
     
      <div className=" w-full h-auto flex flex-col justify-center mt-[20px]">
        
        <h2 className=' font-semibold text-3xl mb-2 '>{symbol}</h2>
        {live ? (
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

<div className="flex flex-col">
<div className="my-[20px] flex justify-center ">
      <button 
      onClick={handleDownloadClick}
      className="button cursor-pointer w-fit text-[18px] z-20 py-[5px] flex items-center text-[12px] rounded-xl px-[15px] font-semibold text-white">{isDownloading ? 'Downloading...' : 'Download Data'}</button>
      </div>
<div className="">
  <DataTable allData={allData} noOfStrikes={noOfStrikes} date={date} />
</div>
</div>
      

      </div>
    </div>
    </div>
  );
}

export default DataPage;
