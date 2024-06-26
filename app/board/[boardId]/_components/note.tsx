import {Kalam} from "next/font/google";
import ContentEditable ,{ContentEditableEvent} from "react-contenteditable";

import { NoteLayer } from "@/types/canvas";

import { useMutation } from "@liveblocks/react/suspense";

import {cn,colorToCss, getContrastingTextColor} from "@/lib/utils";
const font = Kalam({ subsets: ["latin"] ,weight:["400"]});

const calcFontSize =(width:number,height:number)=>{
    const maxFontSize=96;
    // const minFontSize=8;
    const scaleFactor=0.15;

    const fontSizeBasedonWidth=width * scaleFactor;
    const fontSizeBasedonHeight=height * scaleFactor;

    return Math.min(fontSizeBasedonHeight,fontSizeBasedonWidth,maxFontSize);
};
interface NoteProps {
    layer:NoteLayer,
    onPointerDown:(e:React.PointerEvent,id:string)=>void,
    id:string,
    selectionColor?:string
}
export const Note =({
    layer,
    onPointerDown,
    id,
    selectionColor
}:NoteProps)=>{
    const {x,y,width,height,value,fill}=layer;
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
            outline:selectionColor ? `1px solid ${selectionColor}`:"none",
            backgroundColor:fill ? colorToCss(fill):"#000"
        }}
        className="shadow-md drop-shadow-xl">
            <ContentEditable html={value || "Text" }
            onChange={handleContentChange} 
            className={cn(
                "h-full w-full flex flex-col items-center justify-center text-center outline-none",
                font.className
            )}
            style={{
                fontSize:calcFontSize(width,height),
                color:fill ? getContrastingTextColor(fill) :"#000",
            }}/>

        </foreignObject>
    )
}