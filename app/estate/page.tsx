import Card from '@/components/Card'
import { properties } from '@/constant/seedData'
import React from 'react'

const page = () => {
  return (
    <main className='px-4'>
      <section className='grid grid-cols-1 lg:grid-cols-4 gap-5 '>
         {properties.map((props,i) => (
           <Card key={i} {...props}/>
         ))}
      </section>
    </main>
  )
}

export default page
