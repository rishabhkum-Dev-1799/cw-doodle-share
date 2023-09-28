export  interface IconDataProps{
  id?:number
  value:string
  type:string
  icon?:React.ReactNode
}
export interface RoughObj {
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
  color: string;
}