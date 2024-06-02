import React from 'react'

const Card = ({item}) => {
  return (
    <div>
        <div className={`${item.change<0 ? "bg-red-400": "bg-green-400"} w-fit px-[10px] py-[5px] rounded-md`}>
            {item.symbol}
            </div>
    </div>
  )
}

export default Card