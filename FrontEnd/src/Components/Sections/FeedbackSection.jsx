import React from 'react'
import feedbackimg2  from "../../Assets/feedbackimage/feedbackimg2.jpg";
import feedbackimg1  from "../../Assets/feedbackimage/feedbackimg1.jpg";

const FeedbackSection = () => {
  return (
    <>
    <div className=' w-full sm:max-md:h-[60vh] h-[110vh] sm:h-[80vh] bg-[#E6E6FF] flex flex-col items-center pt-8  pb-8 sm:pb-0 '>
    <h1 className='text-2xl sm:text-4xl text-[#0328AC]' data-aos="fade-down"   data-aos-delay="200">What They Say About Us</h1>
    <div className="cards-container w-full h-[100%] pt-20 sm:py-0 sm:h-[100%] sm:flex-row flex flex-col  gap-4 sm:gap-10 items-center justify-between sm:max-md:px-5 sm:px-40 ">

      <div className="card w-[300px] h-[270px] sm:h-[300px] rounded-lg bg-white justify-center flex flex-col gap-4   relative"data-aos="fade-right"   data-aos-delay="200">
       <div className='image-container overflow-hidden  rounded-[50%] w-[110px] h-[110px] absolute top-[-50px] left-[90px]' >
       <img className=' object-cover object-center w-[100%] h-[100%]' data-aos="fade-up"   data-aos-delay="600" src={feedbackimg1} alt="" />
       </div>

         <h1 className=' text-black font-medium sm:text-xl text-center'>Ada Harrison</h1>
         <p className=' text-center'>The Food atmoshphere are spectular.
         Defintely my new favorite spot for Meditarian cusine</p>
         <p className='text-center'>www.youtube.website.com</p>
      </div>
      <div className="card w-[300px] h-[270px] sm:h-[300px] rounded-lg bg-white justify-center flex flex-col gap-4 relative"data-aos="fade-left"   data-aos-delay="200">
       <div className='image-container overflow-hidden rounded-[50%] w-[110px] h-[110px] absolute top-[-50px] left-[90px]'>
       <img className=' object-cover object-center w-[100%] h-[100%]' data-aos="fade-up"   data-aos-delay="600" src={feedbackimg2} alt="" />
       </div>

         <h1 className=' text-black font-medium text-xl text-center'>Ada Harrison</h1>
         <p className=' text-center'>The Food atmoshphere are spectular.
         Defintely my new favorite spot for Meditarian cusine</p>
         <p className='text-center'>www.youtube.website.com</p>
      </div>

      </div>
    </div>
      
    </>
  )
}

export default FeedbackSection
