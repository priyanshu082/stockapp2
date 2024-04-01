import React from 'react'

const SubscriptionCard = ({tittle,price,month,cardDescription,first,second,third,fourth,buttonValue}) => {
  return (
    <>
      <div className='group bg-[#E6E4FF] hover:bg-[#9698ED] hover:text-white h-[500px] w-[310px] rounded-[15px] p-5 flex flex-col gap-5 border-gray-300 border cursor-pointer duration-300 ease-linear'>
        <h3 className='font-semibold text-lg'>{tittle}</h3>
        <div className="price flex items-center gap-2">
            <h3 className='text-2xl font-bold'>{price}</h3>
            <p className='text-xl text-gray-400'>{month}</p>
        </div>
        <p className='text-sm '>{cardDescription}</p>
       <div className="line w-full h-[1px] bg-gray-500"></div>
       <ul className=' list-inside list-decimal'>
       <li>{first}</li>
       <li>{second}</li>
       <li>{third}</li>
       <li>{fourth}</li>
       </ul>
       <button className=' button group-hover:bg-[white] group-hover:text-[#b2b2d4] z-20 bg-[#9698ED] text-white py-2 px-4 rounded-md w-[100%]  duration-300 ease-in mt-28 text-xl font-semibold' onClick={()=>{alert(buttonValue)}}>{buttonValue}</button>
      </div>
    </>
  )
}

export default SubscriptionCard
