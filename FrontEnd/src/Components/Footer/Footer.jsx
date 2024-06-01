import React from 'react'
import  Footerimage  from "../../Assets/Footerimage/footerimage.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className=' w-full h-[100vh] flex flex-col sm:max-md:h-[80vh] bg-white'>
      <div className="top w-[100%] sm:max-md:h-[45%] h-[30%] sm:h-[50%] relative" >
        <h1 className=' text-sm  sm:text-2xl font-semibold text-center top-[40%] sm:max-md:left-[2%] sm:left-[10%] absolute px-5 sm:max-md:px-5 sm:px-0 text-[#0328AC]'data-aos="fade-zoom-in"   data-aos-duration="1000">Empowering traders, one trade at a time. Navigate the markets, navigate your way to wealth</h1>
        <img className=' w-full object-contain h-full ' src={Footerimage} alt="" />
      </div>

      <div className=" text-sm bottom w-[100%]  h-[70%] sm:h-[50%] bg-[#403B3B] flex  justify-evenly text-white items-start pt-10 sm:pt-20 px-8 sm:max-md:px-4 sm:px-0 gap-8 sm:gap-0">
      <div className='flex flex-col justify-around sm:flex-row gap-10 sm:gap-20 sm:max-md:gap-10 text-sm'>
        <ul className='w-[150px] flex flex-col gap-4'>
            <li>Definedge
3rd floor, Ambashish, Plot no. 3-4, Lane number 9, Pakharbag, NDA Pashan Road, Bavdhan, Pune - 411021.</li>
            <li>020-61923200</li>
            <li>info@definedge.co</li>
        </ul>

        <ul className='flex flex-col gap-3'>
        <li>
  <NavLink
    
    to="/AboutUs"
  >
    About Us
  </NavLink>
</li>
<li>
  <NavLink
    
    to="/RefundandCancel"
  >
    Refund & Cancellation
  </NavLink>
</li>
<li>
  <NavLink
    
    to="/termAndCondition"
  >
    T&C
  </NavLink>
</li>
<li>
  <NavLink
    
    to="/Privacypolicy"
  >
    PRIVACY
  </NavLink>
</li>

            
        </ul>
        
        </div>
        <div className='flex flex-col sm:flex-row gap-10 sm:gap-20'>
        {/* <ul className='flex flex-col gap-3'>
            <li>Quick Links</li>
            <li>Blog</li>
            <li>Conference</li>
            <li>Careers</li>
            <li>Events</li>
            <li>Past Events</li>
        </ul> */}
   
        {/* <ul className='flex flex-col gap-3'>
            <li>Policies</li>
            <li>Privacy</li>
            <li>Policy</li>
            <li>Disclaimer</li>
            <li>Terms & Condition</li>
        </ul> */}
        <ul className='flex flex-col gap-3'>
            <li>Get in Touch</li>
            <li>Contact Us</li>
           
        </ul>
        </div>
      </div>
      </div>
    </>
  )
}

export default Footer
