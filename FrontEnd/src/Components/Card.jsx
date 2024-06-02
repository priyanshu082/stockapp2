import React from 'react'

const Card = ({item}) => {
  return (
    <div  className='flex flex-col px-[10px] py-[5px] w-fit'>
      <div className='font-bold text-purple-400 '>{item.symbol}</div>
        <div className={`font-bold gap-2 flex text-white flex-row`}>
             {item.underlyingValue}
            <span className={`${item.change>0 ? "text-green-500 rotate-180" :"text-red-500"} font-bold`}>↓</span>
            </div>
            <div className={`flex flex-row gap-2 ${item.change>0 ? "text-green-500" :"text-red-500"} font-semibold`}>
              <span>{item.change}</span>
              <span>({item.pchange})</span>
            </div>
    </div>
  )
}

export default Card