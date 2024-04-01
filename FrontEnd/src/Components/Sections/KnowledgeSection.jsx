import React from 'react'
import KnowledgeCard from "../KnowledgeCard/KnowledgeCard.jsx"
// import KnowledgeCard from '../knowledgecard/knowledgecard.jsx';
const KnowledgeSection = () => {
  return (
    <div className='w-full h-auto sm:max-md:h-[70vh] sm:h-[110vh]  bg-[#C8C9F6] flex flex-col pb-7 sm:pb-0  pt-3 gap-5'>
    <div className='  flex flex-col justify-center items-center gap-4'>
    <h1 className='text-4xl text-[#0328AC]' data-aos="fade-down"   data-aos-delay="100">Knowledge Base</h1>
    <p className='text-[#0328AC] text-sm' data-aos="fade-up"   data-aos-delay="100">Material to help you get started</p>
    </div>
    <div className=' sm:flex-row flex flex-col flex-wrap px-6 sm:px-0  w-full h-[90%] gap-5 justify-center' >
      <KnowledgeCard/>
      </div>
    </div>
  )
}

export default KnowledgeSection
