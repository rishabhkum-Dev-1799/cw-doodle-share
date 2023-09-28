import React from 'react';

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
    value: 'pencil',
    type: 'drawing-tool',
    icon: <BiPencil size={30} />,
  },
  {
    value: 'line',
    type: 'drawing-tool',
    icon: <HiOutlineMinus size={30} />,
  },
  {
    value: 'rectangle',
    type: 'drawing-tool',
    icon: <BiRectangle size={30} />,
  },
];
const iconModificationData: IconDataProps[] = [
  {
    value: 'undo',
    type: 'modify-tool',
    icon: <BiUndo size={30} />,
  },
  {
    value: 'redo',
    type: 'modify-tool',
    icon: <BiRedo size={30} />,
  },
  {
    value: 'clear',
    type: 'clear-tool',
    icon: <AiOutlineClear size={30} />,
  },
];

const SideBar: React.FC<SideBarProps> = ({ setActions, setModifications }) => {
  // function Handlers
  const actionHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: IconDataProps
  ) => {
    event.preventDefault();
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
            className='overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg'
            onClick={(event) => actionHandler(event, data)}
          >
            {data?.icon}
          </button>
        ))}
        <div className='relative overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg cursor-pointer'>
          <input
            type='color'
            className='absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer'
            onChange={(event) => colorChangeHandler(event)}
          />
          <BiSolidColorFill size={30} />
        </div>
        {iconModificationData.map((data, index: number) => (
          <button
            key={index}
            className='overflow-hidden flex items-center justify-center p-1 text-secondary bg-transparent rounded-lg'
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
