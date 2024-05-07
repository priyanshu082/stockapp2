import React from "react";
import img1 from "../../Assets/Knowledgeimg/img1.png";

const data = [
  {
    img: img1,
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
    link:"https://youtu.be/Q8m0ZYEUElM?si=GfZh5bHSA9A5gtIp"
  },
  {
    img: img1,
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
    link:"https://youtu.be/fjlQ6DDaCXg?si=7IsFzAzPjV5e8i21"
  },
  {
    img: img1,
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
    link:"https://youtu.be/NuT-FNKwsYc?si=V1rInk_puCybLZp5"
  },
  {
    img: img1,
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
    link:"https://youtu.be/8-CjnIoheK0?si=0VJDCWOg2SrAupxF"
  },
];

const KnowledgeCard = () => {
  return (
    <>
      {data.map((e, index) => (
        <a href={e.link} target="_blank">
                <div
          key={index}
          className="hover:cursor-pointer sm:max-md:w-[45vw] sm:max-md:h-[33vw]  w-[90vw] sm:w-[35vw] rounded-3xl  shadow-lg bg-white sm:h-[20vw] h-[60vw] flex flex-col gap-2 "
        >
          
          <div className="w-[100%] h-[80%] flex  overflow-hidden">
            <img
              className="w-[100%] h-[100%] object-fill"
              data-aos="fade-down"
              data-aos-delay="200"
              src={e.img}
              alt=""
            />
          </div>
          <div className=" flex justify-center px-5 h-[20%]">
            <p
              className="text-gray-700 text-sm "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {e.description}
            </p>

          </div>

        </div>
        </a>
    
      ))}
    </>
  );
};

export default KnowledgeCard;
