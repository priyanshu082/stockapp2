import React from "react";
import dot from "../../../Assets/platform-img/line_icon.png";

const Platformcard = ({item}) => {
  return (
    <>
    <div  className=" w-full py-[5vw]">
        <div className={` w-full flex flex-col justify-around ${item.id%2 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
          <div className="top-left w-[100%] h-[60%] sm:h-[100%] sm:w-[60%]  px-10 sm:px-20 flex flex-col justify-center gap-1 sm:gap-5">
            <img className=" w-[100px] sm:w-[225px]" data-aos="fade-right"   data-aos-delay="100" src={dot} alt="" />
            <h1 className="text-xl sm:text-5xl " data-aos="fade-left">Leading platform for <span className="text-red-700">Option analytics in India </span></h1>
            <p className=" text-xl font-semibold sm:text-lg ml-2 sm:ml-10 " data-aos="fade-right" >{item.detail}</p>
          </div>
          <div className="top-right  w-[100%] sm:w-[50%] flex items-center justify-center">
             <img className=" object-contain object-center h-[90%] w-[85%]" data-aos="fade-left" src={item.img} alt=""/>
          </div>
        </div>


        
     </div>
      </>
  )
}

export default Platformcard;
