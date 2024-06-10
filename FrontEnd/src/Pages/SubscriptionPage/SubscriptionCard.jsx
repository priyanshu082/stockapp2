import React ,{useContext,useState,useEffect} from "react";
import axios from "axios";
import { authApi, localapi } from "../../Assets/config";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SubscriptionCard = ({tittle,price,month,cardDescription,first,second,third,fourth,fifth,buttonValue,tenure}) => {
  const {isSubscribed , user , setUser, setIsSubscribed} = useContext(AuthContext);

    const navigate=useNavigate()

  console.log(user?.id)

  const handleSubscription= async(tenure)=>{
      try {
        const email=user?.email
        const response =await axios.post(`${localapi}/subscribe`,{email:email,tenure:tenure})
        console.log(response.data)
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        navigate("/login")
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
      <div className='group bg-[#f4f4f9] hover:bg-[#8889ee] hover:text-white h-fit w-[310px] rounded-[15px] p-5 flex flex-col gap-4 border-gray-300 border cursor-pointer duration-100 ease-linear'>
        <h3 className='font-semibold text-lg'>{tittle}</h3>
        <div className="price flex items-center gap-2">
            <h3 className='text-2xl font-bold'>{price}</h3>
            <p className='text-xl '>{month}</p>
        </div>
        <p className='text-sm'>{cardDescription}</p>
       <div className="line w-full h-[1px] bg-gray-500"></div>
       <div className=' list-inside flex flex-col gap-[1vw] text-sm font-semibold'>
        <div>{first}</div>
       <div>{second}</div>
       <div>{third}</div>
       <div>{fourth}</div> 
       <div>{fifth}</div> 
       </div>
       <button
       onClick={()=>handleSubscription(tenure)}
        className=' button group-hover:bg-[white] group-hover:text-[#807e7e] z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md w-[100%]  duration-100 ease-in text-xl font-semibold' >{buttonValue}</button>
      </div>
    </>
  )
}

export default SubscriptionCard
