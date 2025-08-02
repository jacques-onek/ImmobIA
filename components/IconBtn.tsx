import { IconType } from "react-icons/lib"










interface IconBtnProps {
    title:number
    icon:IconType
}


const IconBtn = ({title,icon}:IconBtnProps) => {
  return (
    <div className='flex place-content-center gap-2 text-center'>
        <>
         {icon}
        </>
        <p>{title}bathrooms</p>
    </div>
  )
}

export default IconBtn
