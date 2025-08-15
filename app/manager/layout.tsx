import Sidebar from '@/components/manager/SideBarManager'
import React from 'react'





const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='sidebarLayout'>
      <div>
        <Sidebar/>
      </div>
      <div className="flex flex-col w-[83vw] justify-center px-5 ">
        {children}
      </div>
    </main>
  )
}

export default layout
