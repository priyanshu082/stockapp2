import React from 'react'
import herosectionimg from "../../Assets/herosectionimg/herosectionimg.png";

const HeroSection = () => {
  return (
    <>
      <section className='Hero w-full h-[60vh] sm:max-md:h-[50vh] sm:h-[80vh] flex  flex-col sm:flex-row'>
      <div className="left sm:w-[40%] w-[100%] sm:h-[100%] h-[30%] px-5 sm:px-0 sm:pl-20 flex items-center">
        <h1 className=' text-2xl sm:max-md:text-3xl sm:text-5xl  text-center font-medium text-[#3B55B2]' data-aos="fade-up"   data-aos-delay="300">Your Journey To Financial Success Begins Here</h1>
      </div>
      <div className="right sm:w-[60%] w-[100%] sm:h-[100%] h-[70%] flex items-center justify-end">
        <img className='w-[100%] sm:w-[90%] h-[100%] object-contain object-center' data-aos="fade-down"   data-aos-delay="300" src={herosectionimg} alt="" />
      </div>
      </section>
    </>
  )
}

export default HeroSection
