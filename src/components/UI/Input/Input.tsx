import React from 'react'
import { twJoin } from 'tailwind-merge'

interface InputProps{
  className?:string,
  props?:React.InputHTMLAttributes<HTMLInputElement>
}
const Input:React.FC<InputProps> = ({className,...props}) => {
  return (
    <input className={twJoin('p-2 md:p-4 my-2 border-2 border-secondary rounded-xl text-white bg-transparent outline-none  text-base md:text-lg',className)} {...props}>
    </input>
  )
}

export default Input