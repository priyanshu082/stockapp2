import React from "react";
import img1 from "../../Assets/Knowledgeimg/img1.png";

const data = [
  {
    videoId: "Q8m0ZYEUElM?si=YS278pdL8DdKbSOa",
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
  },
  {
    videoId: "fjlQ6DDaCXg?si=xP8hH1YSWY0SXd4n",
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
  },
  {
    videoId: "NuT-FNKwsYc?si=lGCp-9m65EVlFdGu",
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
  },
  {
    videoId: "8-CjnIoheK0?si=tOJlfYlsl9NDJfI7",
    description: "orem, ipsum dolor Lorem ipsum dolor Lorem ipsum dolor sit.",
  },
];

const KnowledgeCard = () => {
  return (
    <>
      {data.map((e, index) => (
        <div
          key={index}
          className="hover:cursor-pointer bg-purple-200 sm:max-md:w-[45vw] sm:max-md:h-[33vw] w-[90vw] sm:w-[35vw] rounded-3xl shadow-lg bg-white sm:h-[20vw] h-[60vw] flex flex-col gap-2"
        >
          <div className="w-[100%] h-[95%] flex overflow-hidden rounded-lg">
            <iframe
              className="w-[100%] h-[100%]"
              data-aos="fade-down"
              data-aos-delay="200"
              src={`https://www.youtube.com/embed/${e.videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="text-center pb-[2px] ">
            {e.description}
          </div>
          
        </div>
      ))}
    </>
  );
};

export default KnowledgeCard;

