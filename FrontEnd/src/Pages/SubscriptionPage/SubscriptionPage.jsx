import React from "react";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionPage = () => {
 
  return (
    <>
      <div className=" w-full h-auto flex flex-col items-center justify-center py-14">
        <div className="heading  w-full flex flex-col items-center justify-center px-5 sm:gap-3">
          <h1 className="text-lg sm:text-4xl font-semibold ">
            Lorem ipsum dolor sit amet, consectetur{" "}
          </h1>
          <p className="text-sm sm:text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="cardconstiner flex flex-wrap items-center  w-full h-auto mt-[20px] justify-evenly py-2 gap-6">
          <SubscriptionCard
            tittle="Basic Plan"
            price="$99"
            month="/month"
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get Basic Plan"
          />
          <SubscriptionCard
            tittle="Premium Plan"
            price="$199"
            month="/month"
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get Premium Plan"
          />
          <SubscriptionCard
            tittle="VIP Plan"
            price="$299"
            month="/month"
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get VIP Plan"
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
