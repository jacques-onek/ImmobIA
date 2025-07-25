import React, { ReactNode } from 'react'





const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='min-w-screen h-screen overflow-hidden flex flex-col-reverse justify-between lg:flex-row '>
      <div className='w-full h-4/5 lg:w-2/4 lg:h-full bg-white'>
        {children}
      </div>
      <section className='w-2/4 h-screen bgAuth  max-lg:w-full max-lg:h-[20%] bg-center'/>
        
    </div>
  )
}

export default layout
