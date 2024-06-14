import React, {useEffect,useState,useContext} from 'react'
import axios from "axios";
import DropDown from "./DropDown";
import DataTableComm from "./DataTableComm";
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

  


    const [symbol, setSymbol] = useState("BANKNIFTY")
    const [expiryDate, setExpiryDate] = useState("")
    const [noOfStrikes, setNoOfStrikes] = useState("12")
    const [timeInterval, setTimeInterval] = useState("2")
    const [commutativeData, setCommutativeData] = useState([])
    const [expiryDates, setExpiryDates] = useState([])
    const [twoMin,setTwoMin]=useState()
    const [date,setDate]=useState("")
    const [live, setLive] = useState()

   

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
        }, 30*1000);
        return () => clearInterval(intervalid);
      }
    })

    useEffect(() => {
        if (symbol && expiryDate && noOfStrikes && timeInterval) {
          fetchData();
        }
      }, [symbol, expiryDate, noOfStrikes, timeInterval,twoMin]);
    
      const fetchData = async () => {
        try {
          const response = await axios.post(`${localapi}/commutativesum`, {
            symbol,
            expiryDate,
            noOfStrikes,
            timeInterval,
            date
          });
    
          const data = response.data;
          setCommutativeData(data.data);
        //  console.log(data.data);
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
            date
          });
    
          const data = response.data;
          // console.log(data.data);
          setExpiryDates(data.data);
          setExpiryDate(data.data[0])
        } catch (error) {
          console.error("Error fetching expiry dates:", error);
        }
      }

  return (
    <>
    <Navbar/>
    <div className="sm:p-[50px] p-[10px] ">
      <h1 className="w-full   font-bold text-md sm:text-4xl  my-1 mb-4">
        CAllvsPUT - RideOnWhale.Com
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
          setCommutativeData={setCommutativeData}
          setExpiryDate={setExpiryDate}
          setExpiryDates={setExpiryDates}
          setNoOfStrikes={setNoOfStrikes}
          setSymbol={setSymbol}
          setDate={setDate}
          live={live}
          setLive={setLive}
          twoMin={twoMin}
          date={date}
        />
      </div>

      <div className=" w-full h-auto flex flex-col justify-center mt-[20px]">
        <h1 className=" self-center text-xl font-bold mb-[10px]">
          Table Of Data
        </h1>
        </div>
        {/* <div className="py-[30px] px-[10px]">
           its come from Pages/commutative page/Bargraph 
           <Bargraph commutativeData={commutativeData} /> 
        </div> */}
        <h2 className=' text-center my-[10px] font-semibold text-3xl mb-2 '>{symbol}</h2>
        <div className="">
          <DataTableComm commutativeData={commutativeData} setCommutativeData={setCommutativeData}  />
        </div>
      </div>
    </>
  )
}

export default CommutativeSum
