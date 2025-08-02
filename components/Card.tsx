"use client"
import { Property } from '@/constant/seedData'
import {LuBath, LuBed, LuBookmark,} from "react-icons/lu";
import { GoStarFill } from "react-icons/go";
import { GrLocation } from "react-icons/gr";
import Image  from 'next/image'
import React, { Suspense } from 'react'
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import IconBtn from './IconBtn';


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
      <article className='flex flex-1 shadow lg:w-3xs flex-col gap-1 px-2 py-2 bg-white rounded-lg'>
          <Link href={`/details/${id}`} className='cursor-pointer'>
                <div className='relative'>
                  <div className='flex gap-1 p-2 shadow bg-white text-xs font-mono rounded-full absolute top-2 right-2'>
                    <GoStarFill className='text-yellow-500'/>
                    <p>{rating}</p>
                  </div>
        
                  <Suspense fallback={<Skeleton/>} unstable_expectedLoadTime={2000}>
                    <Image src={image} alt={name}  width={250} height={250} loading='eager' className='w-full rounded-lg' />
                  </Suspense>
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
                <IconBtn title={bathrooms} icon={LuBath} />
                <button>
                  <LuBookmark/>
                </button>
             </div>
        </article>
  )
}

export default Card
