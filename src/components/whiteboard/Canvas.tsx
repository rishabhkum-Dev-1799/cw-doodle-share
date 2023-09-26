import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import rough from 'roughjs';
interface CanvasProps {
  ctxRef?: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  color?: string;
  tool?: string;
}
interface RoughObj {
  type: string;
  offsetX?: number;
  offsetY?: number;
  path?: any;
  stroke?: string;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  rectWidth?: number;
  rectHeight?: number;
}
const Canvas: React.FC<CanvasProps> = ({ ctxRef, canvasRef, color, tool }) => {
  const [isDrawing, setDrawing] = useState<boolean>(false);
  const [elements, setElements] = useState<Array<RoughObj>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  // Handling Side Effects
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.height = containerRef.current?.offsetHeight!;
    canvas.width = containerRef.current?.offsetWidth!;
    const ctx = canvas?.getContext('2d');
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current?.width,
        canvasRef.current?.height
      );
    }
    const roughCanvas = rough.canvas(canvasRef.current!);
    const roughGenerator=roughCanvas.generator
    elements.forEach((element, index) => {
      if (element.type === 'pencil') {
        roughCanvas.draw(roughGenerator.linearPath(element.path));
      } else if (element.type === 'line') {
        if (element.x1 && element.y1 && element.x2 && element.y2) {
          roughCanvas.draw(roughGenerator.line(element.x1, element.y1, element.x2, element.y2));
        }
      } else if (element.type === 'rectangle') {
        if (element.x1 && element.y1 && element.rectWidth && element.rectHeight) {
          roughCanvas.rectangle(element.x1, element.y1, element.rectWidth, element.rectHeight);
        }
      }
    });
  }, [elements]);
  // Function handlers
  const onMouseDownHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setDrawing(true);
    if (tool === 'pencil') {
      setElements((prevValue) => [
        ...prevValue,
        {
          type: 'pencil',
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: 'white',
        },
      ]);
    } else if (tool === 'line') {
      setElements((prevValue) => [
        ...prevValue,
        {
          type: 'line',
          x1: offsetX,
          y1: offsetY,
          x2: offsetX,
          y2: offsetY,
          stroke: 'black',
        },
      ]);
    } else if (tool === 'rectangle') {
      setElements((prevValue) => [
        ...prevValue,
        {
          type: 'rectangle',
          x1: offsetX,
          y1: offsetY,
          rectWidth: 0,
          rectHeight: 0,
          stroke: 'black',
        },
      ]);
    }
  };
  const onMouseMoveHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      if (tool === 'pencil') {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevValue) => {
          return prevValue.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                path: newPath,
              };
            } else {
              return {
                ...element,
              };
            }
          });
        });
      } else if (tool === 'line') {
        setElements((prevValue) => {
          return prevValue.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                x2: offsetX,
                y2: offsetY,
              };
            } else {
              return {
                ...element,
              };
            }
          });
        });
      } else if (tool === 'rectangle') {
        console.log(offsetX,offsetY)
        setElements((prevValue) => {
          return prevValue.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                rectWidth: offsetX-element.x1!,
                rectHeight: offsetY-element.y1!,
              };
            } else {
              return {
                ...element,
              };
            }
          });
        });
      }
    }
  };
  const onMouseUpHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setDrawing(false);
  };
  return (
    <>
      <section
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={onMouseUpHandler}
        ref={containerRef}
        className=' w-[100%] h-[100%] lg:w-[90%] lg:h-[95%] bg-slate-400 overflow-hidden'
      >
        <div className='w-full h-[40px] bg-white flex items-center justify-end gap-2 px-4'>
          <div className='w-[20px] h-[20px] bg-green-600 rounded-full'></div>
          <div className='w-[20px] h-[20px] bg-red-600 rounded-full'></div>
        </div>
        <canvas  className='w-full h-full' ref={canvasRef} />
      </section>
    </>
  );
};

export default Canvas;
