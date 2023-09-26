import React from 'react'

import {HiOutlineMinus} from 'react-icons/hi'
import {BiPencil,BiRectangle,BiSolidColorFill,BiUndo,BiRedo,BiSolidEraser} from 'react-icons/bi'
import {AiOutlineClear} from 'react-icons/ai'
import { IconDataProps } from './whiteBoardTypes'


/**
 * Component Types
 */


type SideBarProps ={
setActions:(data:IconDataProps)=>void
}

/**
 * Icon data for the Props
 */
const iconData:IconDataProps[]=[
  {
    value:'pencil',
    type:'drawing-tool',
    icon:<BiPencil size={30}/>
  },
  {
    value:'line',
    type:'drawing-tool',
    icon:<HiOutlineMinus size={30}/>
  },
  {
    value:'rectangle',
    type:'drawing-tool',
    icon:<BiRectangle size={30}/>
  },
  {
    value:'eraser',
    type:'erasing-tool',
    icon:<BiSolidEraser size={30}/>
  },
  {
    value:'color',
    type:'color-tool',
    icon:<BiSolidColorFill size={30}/>
  },
  {
    value:'undo',
    type:'modify-tool',
    icon:<BiUndo size={30}/>
  },
  {
    value:'redo',
    type:'modify-tool',
    icon:<BiRedo size={30}/>
  },
  {
    value:'clear',
    type:'clear-tool',
    icon:<AiOutlineClear size={30}/>
  },
]

const SideBar:React.FC<SideBarProps> = ({setActions}) => {
  // function Handlers
  const actionHandler=(event:React.MouseEvent<HTMLButtonElement>,data:IconDataProps)=>{
    event.preventDefault();
    setActions(data);
  }
  return (
    <section className='h-screen w-[3rem] sm:w-[5rem] pt-8 border-2 border-secondary '>
      <section className='flex flex-col gap-8 items-center'>
    {
      iconData.map((data,index:number)=>(
        <button key={index} className='overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg' onClick={(event)=>actionHandler(event,data)}>
          {data?.icon}
        </button>
      ))
    }
      </section>
    </section>
  )
}

export default SideBar