

interface IconBtnProps {
    title:number
    icon:React.ElementType
}


const IconBtn = ({title,icon:Icon}:IconBtnProps) => {
  return (
    <div className='flex place-content-center gap-2 text-center'>
        <Icon className="size-3"/>
        <p>{title}bathrooms</p>
    </div>
  )
}

export default IconBtn
