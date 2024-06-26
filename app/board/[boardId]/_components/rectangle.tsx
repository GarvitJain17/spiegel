import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface RectProps {
    id:string;
    layer:RectangleLayer
    onPointerDown :(e:React.PointerEvent,id:string)=>void;
    selectionColor?:string;
}

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:RectProps)=>{
    const {x,y,fill,width,height}=layer;
    return(
        
        <rect
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            transform: `translate(${x}px, ${y}px)`,
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill? colorToCss(fill):"#ffffff"}
        stroke={selectionColor || "transparent"}
        />
    )
}