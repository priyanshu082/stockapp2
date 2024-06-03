import youtubesectionimg from "../../Assets/YoutubeSectionIMg/youtubesectionimg.png";


const SectionYoutube = () => {
  return (
    <>
    <div className='w-full sm:max-md:h-[50vh] h-[40vh] sm:h-[80vh] bg-[#9698ED] sm:px-0 sm:max-md:px-8'>
   <div className="top  h-[40%] sm:h-[30%] w-full px-10 sm:px-0 sm:pl-20 sm:pt-10">
    <h1 className=" text-xl sm:text-3xl text-[#0328AC]" data-aos="fade-down"   > Gaining momentum with enthusiastic Users &
  Counting</h1>
    <p className=" text-[10px] sm:text-lg mt-5 ml-5 text-[#0328AC]" data-aos="fade-up"   data-aos-delay="200">Most dynamic, user-friendly and feature-rich platforms for developing Trading, Investment and Options strategies</p> 
   </div>
   <div className="bottom px-10 sm:px-0 w-full h-[50%] sm:h-[70%]">
    <img className=" object-contain object-center h-[100%] w-[100%]" data-aos="fade-up"  data-aos-delay="400" src={youtubesectionimg} alt="" />
   </div>
    </div>
    </>
  )
}

export default SectionYoutube
