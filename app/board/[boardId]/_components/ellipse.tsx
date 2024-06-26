import { colorToCss } from "@/lib/utils";
import { EllipseLayer} from "@/types/canvas";

interface EllipseProps {
    id:string;
    layer:EllipseLayer
    onPointerDown :(e:React.PointerEvent,id:string)=>void;
    selectionColor?:string;
}

export const Ellipse = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:EllipseProps)=>{
    const {x,y,fill,width,height}=layer;
    return(
        
        <ellipse
        className="drop-shadow-md"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
            transform: `translate(${layer.x}px, ${layer.y}px)`,
        }}
        cx={layer.width/2}
        cy={layer.height/2}
        rx={layer.width/2}
        ry={layer.height/2}
        strokeWidth={1}
        fill={fill? colorToCss(fill):"#ffffff"}
        stroke={selectionColor || "transparent"}
        />
    )
}