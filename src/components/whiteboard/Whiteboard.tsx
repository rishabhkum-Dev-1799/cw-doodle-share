import { useRef, useState } from 'react';

import Canvas from './Canvas';
import SideBar from './SideBar';
import { IconDataProps } from './whiteBoardTypes';

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('black');
  const [elements, setElements] = useState([]);
  const [historyElements, setHistoryElements] = useState([]);

  const actionHandler = (data: IconDataProps) => {
    if (data.type === 'drawing-tool') {
      setTool(data.value);
    } else if (data.type === 'color-tool') {
      setColor(data.value);
    }
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#94a3b8';
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setElements([]);
    }
  };
  const undoHandler = () => {
    const copyArray = [...elements];
    const undoElement = copyArray.pop();
    if (undoElement) {
      setElements(copyArray);
      setHistoryElements((prevValue) => [...prevValue, undoElement]);
    }
  };
  const redoHandler = () => {
    if (historyElements) {
      const historyElement = [...historyElements];
      const redoElement = historyElement.pop();
      if (redoElement) {
        setHistoryElements(historyElement);
        setElements((prevValue) => [...prevValue, redoElement]);
      }
    }
  };
  const modificationHandler = (data: IconDataProps) => {
    if (data.value === 'clear') {
      clearCanvas();
    } else if (data.value === 'undo') {
      undoHandler();
    } else if (data.value === 'redo') {
      redoHandler();
    }
  };
  return (
    <section className='w-full h-full flex gap-2 '>
      <SideBar
        setActions={actionHandler}
        setModifications={modificationHandler}
      />
      <div className=' flex-1 h-screen border-2 border-secondary flex items-center justify-center'>
        <Canvas
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          tool={tool}
          color={color}
          elements={elements}
          setElements={setElements}
        />
      </div>
    </section>
  );
};

export default Whiteboard;
