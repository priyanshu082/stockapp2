import React from "react";
import Platformcard from "./Platformcard";
import { PagesDetail } from "../../../Assets/Data";

const PlatformSection = () => {
  return (
    <>
      <div className="bg-[#E6E6FF]">
        {PagesDetail.map((item)=>(
          <Platformcard item={item}/>
        ))}
      </div>
    </>
  );
};

export default PlatformSection;
