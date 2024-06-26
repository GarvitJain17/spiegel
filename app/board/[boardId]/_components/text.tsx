import {Kalam} from "next/font/google";
import ContentEditable ,{ContentEditableEvent} from "react-contenteditable";

import { TextLayer } from "@/types/canvas";

import { useMutation } from "@liveblocks/react/suspense";

import {cn,colorToCss} from "@/lib/utils";
const font = Kalam({ subsets: ["latin"] ,weight:["400"]});

const calcFontSize =(width:number,height:number)=>{
    const maxFontSize=96;
    // const minFontSize=8;
    const scaleFactor=0.5;

    const fontSizeBasedonWidth=width * scaleFactor;
    const fontSizeBasedonHeight=height * scaleFactor;

    return Math.min(fontSizeBasedonHeight,fontSizeBasedonWidth,maxFontSize);
};
interface TextProps {
    layer:TextLayer,
    onPointerDown:(e:React.PointerEvent,id:string)=>void,
    id:string,
    selectionColor?:string
}
export const Text =({
    layer,
    onPointerDown,
    id,
    selectionColor
}:TextProps)=>{
    const {x,y,width,height,value}=layer;
    const updateValue =useMutation((
        {storage},
        newValue:string,
    ) =>{
        const livelayers= storage.get("layers");

        livelayers.get(id)?.set("value", newValue);
    },[])
    const handleContentChange=(e:ContentEditableEvent)=>{
        updateValue( e.target.value);
    }
    return (
        <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e,id)}
        style={{
            outline:selectionColor ? `1px solid ${selectionColor}`:"none"
        }}>
            <ContentEditable html={value || "Text" }
            onChange={handleContentChange} 
            className={cn(
                "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                font.className
            )}
            style={{
                fontSize:calcFontSize(width,height),
                lineHeight:`${height}px`,
                color:colorToCss(layer.fill),
            }}/>

        </foreignObject>
    )
}