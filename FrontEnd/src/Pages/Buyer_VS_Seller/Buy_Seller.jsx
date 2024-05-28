import {React,useEffect,useState,useContext} from 'react'
import axios from "axios";
import DropDown from "./DropDown";
import DataTable from "./DataTable";
// import Bargraph from "./BarGraph";
import { localapi } from '../../Assets/config';
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from "../../Context/AuthContext";


const CommutativeSum = () => {

  const {setIsSubscribed,user,setUser} = useContext(AuthContext);
  // console.log(user)

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


    // const [symbol, setSymbol] = useState("BANKNIFTY");
    // const [expiryDate, setExpiryDate] = useState("");
    // const [noOfStrikes, setNoOfStrikes] = useState("12");
    // const [timeInterval, setTimeInterval] = useState("2");
    // const [commutativeData, setCommutativeData] = useState([]);
    // const [expiryDates, setExpiryDates] = useState([]);

    const [symbol, setSymbol] = useState("BANKNIFTY");
    const [expiryDate, setExpiryDate] = useState("");
    const [noOfStrikes, setNoOfStrikes] = useState("12");
    const [timeInterval, setTimeInterval] = useState("2");
    const [buySellData, setBuySellData] = useState([]);
    const [strikePrice, setStrikePrice] = useState("");
    const [strikePriceData, setStrikePriceData] = useState([]);
    const [expiryDates, setExpiryDates] = useState([]);
    const [twoMin,setTwoMin]=useState()

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

    
    
    useEffect(() => {
      if (symbol && expiryDate && noOfStrikes && timeInterval) {
        fetchData();
        
      }
    }, [timeInterval,symbol, expiryDate, strikePrice,twoMin ]);


      const fetchData = async () => {
        try {
          const response = await axios.post(`${localapi}/buysell`, {
            symbol,
            expiryDate,
            strikePrice,
            timeInterval,
          });

    
     
          const data = response.data;
          setBuySellData(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };


    

      useEffect(() => {
        if (symbol && expiryDate && noOfStrikes ) {
          fetchStrikepriceData();
        }
      }, [symbol, expiryDate, noOfStrikes,twoMin]);
    

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
        //   console.log(strikePriceData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

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
        //   console.log(data.data);
          setExpiryDates(data.data);
          setExpiryDate(data.data[0])
        } catch (error) {
          console.error("Error fetching expiry dates:", error);
        }
      };

    //   console.log(buySellData)
  return (
    <>
    <Navbar/>
    <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full font-bold text-md sm:text-4xl  my-1 mb-4">
        BUYERvsSELLER - RideOnWhale.Com
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
          setExpiryDate={setExpiryDate}
          setExpiryDates={setExpiryDates}
          setNoOfStrikes={setNoOfStrikes}
          setSymbol={setSymbol}
          strikePriceData={strikePriceData}
          strikePrice={strikePrice}
          setStrikePrice={setStrikePrice}
        />
      </div>

      <div className=" w-full h-auto flex flex-col justify-center mt-[20px]">
        <h1 className=" self-center text-xl font-bold mb-[10px]">
          Table Of Data
        </h1>
        </div>
        <h2 className=' text-center mt-[10px] font-semibold text-3xl mb-2 '>{symbol}</h2>
        <div className="">
           <DataTable buySellData={buySellData} setBuySellData={setBuySellData}  />
        </div>
      </div>
    </>
  )
}

export default CommutativeSum
