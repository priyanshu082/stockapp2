import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { localapi } from '../Assets/config'
import Card from './Card'
import useMeasure from "react-use-measure"
import {animate, useMotionValue,motion} from "framer-motion"




const InfiniteMoving = () => {
    let [ref,{width}]=useMeasure()

    const [data, setdata] = useState([])
    const [twoMin,setTwoMin]=useState()

    const updateTwoMin=()=>{
        const currentTime=new Date()
        setTwoMin(currentTime)
      }
   
      useEffect(()=>{
        const intervalid=setInterval(() => {
          updateTwoMin()
        }, 30*1000);
        return () => clearInterval(intervalid);
      })

    useEffect(()=>{
        fetchdata();
    },[twoMin])

    const fetchdata=async()=>{
        try {
            const res=await axios.get(`${localapi}/banner`)
            console.log(res.data.data)
            setdata(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const xTranslation=useMotionValue(0)

    useEffect(()=>{
        let controls
        let finalPosition=-width/2-4
        controls=animate(xTranslation,[0,finalPosition],{
            ease:"linear",
            duration:25,
            repeat:Infinity,
            repeatType:"loop",
            repeatDelay:0,
        })

        return controls.stop
    },[xTranslation,width])


  return (
    <div className=''>
 <motion.div ref={ref} className='absolute bg-purple-950 left-0 flex flex-row overflow-scroll gap-2 scrollbar-hide mt-[0px]' style={{x:xTranslation}}>
        {[...data,...data].map((item,key)=>(
            <div key={key} className=''>
                    <Card item={item}/>
            </div>
        ))}
    </motion.div>
    </div>
   
  )
}

export default InfiniteMoving