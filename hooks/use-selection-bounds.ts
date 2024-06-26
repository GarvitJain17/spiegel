import { Layer, XYWH } from "@/types/canvas";
import { shallow } from "@liveblocks/client";
import { useSelf, useStorage } from "@liveblocks/react/suspense";

const boundingBox =(layers:Layer[]):XYWH |null =>{
    const first =layers[0];
    if(!first) return null;
    let left=first.x;
    let top=first.y;
    let right=first.x+first.width;
    let bottom=first.y+first.height;
    for(let i=1;i<layers.length;i++){
        const {x,y,width,height} = layers[i];
        if(x<left) left=x;
        if(y<top) top=y;
        if(x+width>right) right=x+width;
        if(y+height>bottom) bottom=y+height;
    }
    return {
        x:left,
        y:top,
        width:right-left,
        height:bottom-top
    };
}
export const useSelectionBounds =() =>{
    const bounds =useSelf((me) => me.presence.selectedLayer)
    return useStorage((root) => {
        const selectedLayers = bounds.map((layerId) => root.layers.get(layerId)!).filter(Boolean) as Layer[];
        if(!selectedLayers) return null;
        return boundingBox(selectedLayers);
    },shallow)
};