import React from "react";
import rimg from "../../../Assets/platform-img/rimg.png";
import limg from "../../../Assets/platform-img/limg.png";
import dot from "../../../Assets/platform-img/line_icon.png";

const Platformcard = () => {
  return (
    <>
    <div className=" h-[80vh] sm:h-[100vh] w-full">
        <div className="top h-[50%] w-full flex flex-col sm:flex-row ">
          <div className="top-left w-[100%] h-[60%] sm:h-[100%] sm:w-[60%]  px-10 sm:px-20 flex flex-col justify-center gap-1 sm:gap-5">
            <img className=" w-[100px] sm:w-[225px]" data-aos="fade-right"   data-aos-delay="100" src={dot} alt="" />
            <h1 className="text-xl sm:text-5xl " data-aos="fade-left">Leading platform for <span className="text-red-700">Option analytics in India </span></h1>
            <p className=" text-xs sm:text-lg ml-2 sm:ml-10 " data-aos="fade-right" >Build, track and enhance your Options strategies with OPSTRA.</p>
          </div>
          <div className="top-right  w-[100%] sm:w-[40%] flex items-center justify-center">
             <img className=" object-contain object-center h-[70%] w-[70%]" data-aos="fade-left" src={rimg} alt=""/>
          </div>
        </div>


        <div className="bottom h-[50%] w-full flex flex-col sm:flex-row-reverse ">
          <div className="bottom-left  w-[100%] h-[60%]   sm:h-[100%] sm:w-[60%] px-10 sm:px-20 flex flex-col justify-center gap-1 sm:gap-5">
            <img className="  w-[100px] sm:w-[225px]" data-aos="fade-left"   data-aos-delay="100" src={dot} alt="" />
            <h1 className=" text-xl sm:text-5xl  "data-aos="fade-right"   data-aos-delay="100">Leading platform for <span className="text-red-700">Option analytics in India </span></h1>
            <p className="text-xs sm:text-lg ml-2 sm:ml-10 " data-aos="fade-left"   data-aos-delay="100">Build, track and enhance your Options strategies with OPSTRA.</p>
          </div>
          <div className="bottom-right sm:h-[100%] h-[55%]   w-[100%] sm:w-[40%] flex items-center justify-center">
             <img className=" object-contain object-center h-[70%] w-[70%]"data-aos="fade-right" data-aos-delay="100" src={limg} alt=""/>
          </div>
        </div>
     </div>
      </>
  )
}

export default Platformcard;
