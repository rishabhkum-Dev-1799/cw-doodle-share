import React from 'react';
import {twMerge} from 'tailwind-merge'

interface DefaultButtonProps extends React.ComponentPropsWithoutRef<'button'>{
children?:React.ReactNode
className?:string
}

const DefaultButton=({children,className,...props}:DefaultButtonProps)=>{
  return (
    <button className={twMerge('bg-secondary rounded-lg p-4 font-normal text-md text-white border border-white shadow-xl hover:scale-110',className)} {...props}>
      {children}
    </button>
  )

}

export default DefaultButton