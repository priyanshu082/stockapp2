import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { localapi } from '../../Assets/config'
import Navbar from '../../Components/Navbar/Navbar'
import { AuthContext } from "../../Context/AuthContext";

const Screener = () => {

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

  
    const [data,setData]=useState()
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

    useEffect(()=>{
        fetchData()
    },[twoMin])

    const fetchData=async()=>{
        try {
            const response=await axios.get(`${localapi}/screener`)
            const data=response.data.data
            // console.log(response.data.data)
            setData(data)
        } catch (error) {
            console.log("Data not fetched" ,error)
        }
    }

    const headingCollection=[
        "S.no",
        "Stocks",
        "Trend"
    ]

    const getBackgroundColor = (value) => ({
        'Bearish': { backgroundColor: '#EF5350' },
        'Sideways': { backgroundColor: '' },
        'Bullish': { backgroundColor: 'lightgreen' },
        }[value] || {backgroundColor: 'white'});

    
  return (
    <>
    <Navbar/>
     <div className='pt-[4vw] px-[4vw] flex flex-col pb-[5vw] items-center'>
        <div className='text-[3.5vw] font-semibold'>
       Trend - RideOnWhale.Com
        </div>

        <div className='flex flex-col w-[100%] justify-center items-center mt-[3vw]'>
        <table className="w-[50%]">
        <thead className='border-[0.5px] border-black '>
        <tr className=''>
            {headingCollection.map((heading, index) => (
              <th
                className=" z-20 bg-gray-300 px-[2px] text-center text-sm font-semibold"
                key={index}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='border-[0.5px] gap-[2vw] border-black'>
        {data && Object.entries(data).map(([stock, trend], index) => (
          <tr className="text-black mt-[10px]" key={index}>
            <td className="text-sm px-[3px] pt-[0.8vw] text-center">{index + 1}</td>
            <td className="text-sm px-[3px] text-center">{stock}</td>
            <td className={` text-sm px-[3px] text-center`} style={getBackgroundColor(trend)}>{trend}</td>
          </tr>
        ))}
            </tbody>
        
      </table> 
        </div>


    </div>
    </>
   
  )
}

export default Screener