
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { localapi } from '../../Assets/config';
import Navbar from '../../Components/Navbar/Navbar';
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Screener = () => {
  const { isSubscribed , user , setUser, setIsSubscribed ,symbol ,setSymbol } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(symbol)
  // console.log(user)
  useEffect(() => {
    if (user) {
      axios.post(`${localapi}/issubscribed`, { email: user?.email })
        .then((result) => {
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
  }, [user])

  const [data, setData] = useState([]);
  const [twoMin, setTwoMin] = useState();

  const updateTwoMin = () => {
    const currentTime = new Date();
    setTwoMin(currentTime);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTwoMin();
    }, 30 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchData();
  }, [twoMin]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${localapi}/screener`);
      const data = response.data.data;
      console.log(response.data.data);
      setData(data);
    } catch (error) {
      console.log("Data not fetched", error);
    }
  }

  const headingCollection = [
    "S.no",
    "Stocks",
    "Trend",
    "Underlying Value",
    "Time"
  ];

  const getBackgroundColor = (value) => ({
    'Bearish': { backgroundColor: '#EF5350' },
    'Sideways': { backgroundColor: '' },
    'Bullish': { backgroundColor: 'lightgreen' },
  }[value] || { backgroundColor: 'white' });

  const sortedData = data.sort((a, b) => {
    // Define the order of trends
    const trendOrder = {
      'Bullish': 1,
      'Bearish': 2,
      'Sideways': 3
    };
  
    // Compare the trend values based on the defined order
    return trendOrder[a.Trend] - trendOrder[b.Trend];
  });

  return (
    <>
      <Navbar />
      <div className='pt-[4vw] px-[4vw] flex flex-col pb-[5vw] items-center'>
        <div className='text-[3.5vw] font-semibold'>
          Trend - RideOnWhale.Com
        </div>
        <div className='flex flex-col w-[100%] justify-center items-center mt-[3vw]'>
          <table className="w-[50%] border-collapse border border-gray-400">
            <thead className='bg-gray-200'>
              <tr>
                {headingCollection.map((heading, index) => (
                  <th
                    className="border text-center border-gray-300 px-4 py-2 text-left text-sm font-semibold"
                    key={index}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
              sortedData.map((item, index) => (
                <tr 
                onClick={()=>{
                  setSymbol(item.symbol)
                  navigate("/data")
                }}
                key={index} className="even:bg-gray-100 text-center cursor-pointer hover:bg-blue-100">
                  <td className="border border-gray-300 px-4 py-4 text-sm">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{item.symbol}</td>
                  <td
                    className={`border border-gray-300 px-4 py-4 text-sm text-center ${
                      item.Trend === 'Bearish'
                        ? 'bg-red-500'
                        : item.Trend === 'Bullish'
                        ? 'bg-green-400'
                        : ''
                    }`}
                  >
                    {item.Trend}
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{item.underlyingValue}</td>
                  <td className="border border-gray-300 px-4 py-4 text-sm">{item.Time}</td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Screener;