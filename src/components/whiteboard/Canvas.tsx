import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import rough from 'roughjs';
import { RoughObj } from './whiteBoardTypes';
interface CanvasProps {
  ctxRef?: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  color: string;
  tool: string;
  elements:RoughObj[]
  setElements:(data:any)=>void
}

const Canvas: React.FC<CanvasProps> = ({ ctxRef, canvasRef, color, tool,elements,setElements }) => {
  const [isDrawing, setDrawing] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Handling Side Effects
  useEffect(() => {
    const canvas = canvasRef.current!;
    canvas.height = containerRef.current?.offsetHeight!;
    canvas.width = containerRef.current?.offsetWidth!;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;
    if (ctx) {
      ctx.lineCap = 'round';
    }
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
    const roughGenerator = roughCanvas.generator;
    elements.forEach((element) => {
      if (element.type === 'pencil') {
        roughCanvas.draw(
          roughGenerator.linearPath(element.path, {
            roughness: 0,
            stroke: element.color,
            strokeWidth: 4,
          })
        );
      } else if (element.type === 'line') {
        if (element.x1 && element.y1 && element.x2 && element.y2) {
          roughCanvas.draw(
            roughGenerator.line(
              element.x1,
              element.y1,
              element.x2,
              element.y2,
              { roughness: 0, stroke: element.color, strokeWidth: 4 }
            )
          );
        }
      } else if (element.type === 'rectangle') {
        if (
          element.x1 &&
          element.y1 &&
          element.rectWidth &&
          element.rectHeight
        ) {
          roughCanvas.rectangle(
            element.x1,
            element.y1,
            element.rectWidth,
            element.rectHeight,
            { roughness: 0, stroke: element.color, strokeWidth: 4 }
          );
        }
      }
    });
  }, [elements]);
  // Function handlers
  const onMouseDownHandler = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setDrawing(true);
    if (tool === 'pencil') {
      setElements((prevValue: any) => [
        ...prevValue,
        {
          type: 'pencil',
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          color: color,
        },
      ]);
    } else if (tool === 'line') {
      setElements((prevValue: any) => [
        ...prevValue,
        {
          type: 'line',
          x1: offsetX,
          y1: offsetY,
          x2: offsetX,
          y2: offsetY,
          color: color,
        },
      ]);
    } else if (tool === 'rectangle') {
      setElements((prevValue: any) => [
        ...prevValue,
        {
          type: 'rectangle',
          x1: offsetX,
          y1: offsetY,
          rectWidth: 0,
          rectHeight: 0,
          color: color,
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
        setElements((prevValue: any[]) => {
          return prevValue.map((element: any, index: number) => {
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
        setElements((prevValue: any[]) => {
          return prevValue.map((element: any, index: number) => {
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
        console.log(offsetX, offsetY);
        setElements((prevValue: any[]) => {
          return prevValue.map((element: { x1: any; y1: any; }, index: number) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                rectWidth: offsetX - element.x1!,
                rectHeight: offsetY - element.y1!,
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
  const onMouseUpHandler = () => {
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
        <canvas className='w-full h-full' ref={canvasRef} />
      </section>
    </>
  );
};

export default Canvas;
