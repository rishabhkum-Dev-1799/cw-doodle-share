import { useRef, useState } from 'react';

import Canvas from './Canvas';
import SideBar from './SideBar';
import { IconDataProps } from './whiteBoardTypes';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('white');

  const actionHandler = (data: IconDataProps) => {
    if (data.type === 'drawing-tool') {
      setTool(data.value);
    } else if (data.type === 'color-tool') {
      setColor(data.value);
    }
  };
  return (
    <section className='w-full h-full flex gap-2 '>
      <SideBar setActions={actionHandler} />
      <div className=' flex-1 h-screen border-2 border-secondary flex items-center justify-center'>
        <Canvas canvasRef={canvasRef} ctxRef={ctxRef} tool={tool} color={color} />
      </div>
    </section>
  );
};

export default Whiteboard;
