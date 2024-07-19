import {React,useState,useEffect,useContext} from 'react'
import DropDown from "./DropDown";
import axios from "axios";
import  LineChartsCallsPuts  from './LineChartsCallsPuts';
import  LineChartsCallsPuts2  from './LineChartsCallsPuts2';
import { localapi } from '../../Assets/config';
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from "../../Context/AuthContext";
// import  LineChartsPuts from './LineChartsPuts';
// import LineChartPrice from "./LineChartPrice";


const StrikeGraph = () => {

  const {setIsSubscribed,user,setUser} = useContext(AuthContext);
  // console.log(user)

  useEffect(()=>{
    if(user){
      axios.post(`${localapi}/issubscribed`, {email: user?.email}).then((result) => {
        // console.log(result.data.data);
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

  


    const [symbol, setSymbol] = useState("BANKNIFTY")
    const [expiryDate, setExpiryDate] = useState("")
    const [noOfStrikes, setNoOfStrikes] = useState("12")
    const [timeInterval, setTimeInterval] = useState("2")
    const [strikePrice, setStrikePrice] = useState("")
    const [strikePriceHigh, setStrikePriceHigh] = useState("")
    const [strikePriceData, setStrikePriceData] = useState([])
    const [strikegraphData, setStrikegraphData] = useState([])
    const [expiryDates, setExpiryDates] = useState([])
    const [twoMin,setTwoMin]=useState()
    const [live, setLive] = useState()
    const [date,setDate]=useState("")


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

    const updateTwoMin=()=>{
      const currentTime=new Date()
      setTwoMin(currentTime)
    }
 
    useEffect(()=>{
      if(live){
        const intervalid=setInterval(() => {
          updateTwoMin()
        }, 30000);
        return () => clearInterval(intervalid);
      }
    })

    useEffect(() => {
        if (symbol && expiryDate && strikePrice && timeInterval) {
          fetchData();
        }
      }, [symbol, expiryDate, strikePrice, timeInterval,date]);

    useEffect(() => {
        if (live) {
          fetchData();
        }
      }, [twoMin]);
    
      const fetchData = async () => {
        try {
          const response = await axios.post(`${localapi}/strikegraph`, {
            symbol,
            expiryDate,
            strikePrice,
            timeInterval,
            noOfStrikes,
            date
          });
          const data = response.data;
          console.log(data.data)
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
      }, [symbol, expiryDate, noOfStrikes,date]);
    

      //strike price api call
      const fetchStrikepriceData = async () => {
        try {
          const response = await axios.post(`${localapi}/strikeprices`, {
            symbol,
            expiryDate,
            noOfStrikes,
            date,
          });
    
          const data = response.data
          setStrikePriceData(data.data);
          setStrikePrice(data.data[0])
          setStrikePriceHigh(data.data[noOfStrikes*2-1])
  
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

 

      // expiredate api 
      useEffect(() => {
        if (symbol) {
          fetchExpiryDates();
        }
      }, [symbol,date]);
    
      //for expiry dates
      const fetchExpiryDates = async () => {
        try {
          const response = await axios.post(`${localapi}/expirydates`, {
            symbol,
            date,
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
    <Navbar/>
 <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full   font-bold text-md sm:text-4xl  my-1 mb-4">
        PRICE - RideOnWhale.Com
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
          live={live}
          setDate={setDate}
          setLive={setLive}
        />

      </div>
        <div className="py-[30px] px-[10px] flex flex-col">
          {/* its come from Pages/strike graph page/Bargraph */}
          <h2 className=' text-center font-semibold text-3xl mb-2 '>{symbol}</h2>
          <h2 className=' text-center text-2xl mb-2 '>COI Calls And Puts Graph</h2>
          <div className='flex flex-col gap-10 md:gap-[0] md:flex-row justify-between mt-[50px]'>

          <LineChartsCallsPuts data={strikegraphData} strikePriceData={strikePriceData} strikePrice={strikePrice} strikePriceHigh={strikePriceHigh}  />
          <LineChartsCallsPuts2 data={strikegraphData} strikePriceData={strikePriceData} strikePrice={strikePrice} strikePriceHigh={strikePriceHigh}  />
          </div>
        </div>
      </div>    
      </>
  )
}

export default StrikeGraph