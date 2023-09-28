import React from 'react'
import { twJoin } from 'tailwind-merge'
interface InputProps{
  className?:string,
  value?:string,
  placeholder?:string,
  name?:string,
  onChange?:(event:React.ChangeEvent<HTMLInputElement>)=>void
  props?:React.HTMLAttributes<HTMLInputElement>,
  required?:boolean,
  disabled?:boolean
  
}
const Input = ({className,value,placeholder,name,required,disabled,onChange,props}:InputProps) => {
  return (
    <input className={twJoin('p-2 md:p-4 my-2 border-2 border-secondary rounded-xl text-white bg-transparent outline-none  text-base md:text-lg',className)} placeholder={placeholder} name={name} value={value} required={required} disabled={disabled} onChange={onChange} {...props}>
    </input>
  )
}

export default Input