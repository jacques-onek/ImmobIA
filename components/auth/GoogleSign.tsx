"use client"
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { signWithGoogle } from '@/lib/actions/user.actions'

const GoogleSign = () => {
  return (
    <form className='w-full mt-3' action={signWithGoogle}>
       <div className="flex  gap-8 w-full">
          <Button className='w-full' asChild>
            <button type="submit" className="flex gap-4 cursor-pointer w-full ">
              <Image src="/icons/chercher.png" alt="Google logo" height={15} width="15" />
              <p> continue with google</p>
            </button>
          </Button>
       </div>
    </form>
  )
}

export default GoogleSign
