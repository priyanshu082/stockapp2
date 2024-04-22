import React ,{useContext,useState,useEffect} from "react";
import axios from "axios";
import { authApi } from "../../Assets/config";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const SubscriptionCard = ({tittle,price,month,cardDescription,first,second,third,fourth,buttonValue,type}) => {
  const {user,setUser} = useContext(AuthContext);
    const navigate=useNavigate()
  console.log(user.id)
  const handleSubscription= async(type)=>{
      try {
        const id=user.id
        const response =await axios.post(`${authApi}/user/subscription`,{id,type})
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
      <div className='group bg-[#f4f4f9] hover:bg-[#8889ee] hover:text-white h-fit w-[310px] rounded-[15px] p-5 flex flex-col gap-4 border-gray-300 border cursor-pointer duration-300 ease-linear'>
        <h3 className='font-semibold text-lg'>{tittle}</h3>
        <div className="price flex items-center gap-2">
            <h3 className='text-2xl font-bold'>{price}</h3>
            <p className='text-xl '>{month}</p>
        </div>
        <p className='text-sm '>{cardDescription}</p>
       <div className="line w-full h-[1px] bg-gray-500"></div>
       <ul className=' list-inside list-decimal'>
       {/* <li>{first}</li>
       <li>{second}</li>
       <li>{third}</li>
       <li>{fourth}</li> */}
       </ul>
       <button
       onClick={()=>handleSubscription(type)}
        className=' button group-hover:bg-[white] group-hover:text-[#807e7e] z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md w-[100%]  duration-300 ease-in mt-28 text-xl font-semibold' >{buttonValue}</button>
      </div>
    </>
  )
}

export default SubscriptionCard
