import { Property } from '@/constant/seedData'
import {LuBath, LuBed, LuBookmark, LuSave } from "react-icons/lu";
import { GoStarFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';

const Card = ({
  id,
  name,
  price,
  bedrooms,
  bathrooms,
  address,
  rating,
  image
}:Property) => {
  return (
      <article className='flex shadow w-3xs flex-col gap-1 px-2 py-2 bg-white rounded-lg'>
          <Link href={`/details/${id}`} className='cursor-pointer'>
                <div className='relative'>
                  <div className='flex gap-1 p-2 shadow bg-white text-xs font-mono rounded-full absolute top-2 right-2'>
                    <GoStarFill className='text-yellow-500'/>
                    <p>{rating}</p>
                  </div>
                  <Image src={image} alt={name} width={250} height={250} loading='lazy' className=' rounded-lg' />
                  <div className='flex gap-1 p-1 shadow bg-white text-[9px]  font-mono rounded-full absolute bottom-2 left-2'>
                    <GrLocation className='size-3' />
                    <p>{address.substring(4,15)}</p>
                  </div>
                </div>
          </Link>
             <div className='flex font-mono border-b-2 border-slate-100 pb-2 text-base justify-between w-full'>
                <Link href={`/details/${id}`}>
                  <p>{name}</p>
                </Link>
                <p>${price}</p>
              </div>
              <div className='flex text-xs gap-x-2'>
                <div className='flex place-content-center gap-2 text-center'>
                  <LuBed />
                  <p>{bedrooms}bedrooms</p>
                </div>
                <div className='flex place-content-center gap-2 text-center'>
                  <LuBath />
                  <p>{bathrooms}bathrooms</p>
                </div>
                <button>
                  <LuBookmark/>
                </button>
             </div>
        </article>
  )
}

export default Card
