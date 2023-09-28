import React, { useState } from 'react';

import { HiOutlineMinus } from 'react-icons/hi';
import {
  BiPencil,
  BiRectangle,
  BiSolidColorFill,
  BiUndo,
  BiRedo,
} from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import { IconDataProps } from './whiteBoardTypes';

/**
 * Component Types
 */

interface SideBarProps {
  setActions: (data: IconDataProps) => void;
  setModifications: (data: IconDataProps) => void;
}

/**
 * Icon data for the Props
 */
const iconDrawingData: IconDataProps[] = [
  {
    id:1,
    value: 'pencil',
    type: 'drawing-tool',
    icon: <BiPencil size={30} />,
  },
  {
    id:2,
    value: 'line',
    type: 'drawing-tool',
    icon: <HiOutlineMinus size={30} />,
  },
  {
    id:3,
    value: 'rectangle',
    type: 'drawing-tool',
    icon: <BiRectangle size={30} />,
  },
];
const iconModificationData: IconDataProps[] = [
  {
    id:1,
    value: 'undo',
    type: 'modify-tool',
    icon: <BiUndo size={30} />,
  },
  {
    id:2,
    value: 'redo',
    type: 'modify-tool',
    icon: <BiRedo size={30} />,
  },
  {
    id:3,
    value: 'clear',
    type: 'clear-tool',
    icon: <AiOutlineClear size={30} />,
  },
];

const SideBar: React.FC<SideBarProps> = ({ setActions, setModifications }) => {
  const [activeIcon,setActiveIcon]=useState(1)
  // function Handlers
  const actionHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: IconDataProps
  ) => {
    event.preventDefault();
    if(data?.id){
      setActiveIcon(data?.id)
    }
    setActions(data);
  };
  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const data = {
      value: event.target.value,
      type: 'color-tool',
    };
    setActions(data);
  };
  const modificationHandler = (event: React.MouseEvent<HTMLButtonElement>,data:IconDataProps) => {
    event.preventDefault();
    setModifications(data);
  };
  return (
    <section className='h-screen w-[3rem] sm:w-[5rem] pt-8 border-2 border-secondary '>
      <section className='flex flex-col gap-8 items-center'>
        {iconDrawingData.map((data, index: number) => (
          <button
            key={index}
            className={`overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg ${activeIcon===++index?'bg-white':''}` }
            onClick={(event) => actionHandler(event, data)}
          >
            {data?.icon}
          </button>
        ))}
        <div className='relative overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg cursor-pointer hover:scale-110 hover:text-white'>
          <input
            type='color'
            className='absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer '
            onChange={(event) => colorChangeHandler(event)}
          />
          <BiSolidColorFill size={30} />
        </div>
        {iconModificationData.map((data, index: number) => (
          <button
            key={index}
            className='overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg hover:scale-110 hover:text-white'
            onClick={(event) => modificationHandler(event, data)}
          >
            {data?.icon}
          </button>
        ))}
      </section>
    </section>
  );
};

export default SideBar;
