import React from "react";
import Platformcard from "./Platformcard";
import { PagesDetail } from "../../../Assets/Data";

const PlatformSection = () => {
  return (
    <>
      <div className="bg-[#E6E6FF]">
        {PagesDetail.map((item,index)=>(
          <div key={index}>
            <Platformcard item={item}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlatformSection;
