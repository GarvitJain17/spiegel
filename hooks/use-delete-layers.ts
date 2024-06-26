import { useSelf,useMutation } from "@liveblocks/react/suspense";

export const useDeleteLayers =()=>{
    const selection =useSelf((me) => me.presence.selectedLayer);

    return useMutation((
        {storage,setMyPresence},
    )=>{
        const liveLayers = storage.get("layers");
        const livelayerids = storage.get("layerids");
        selection.forEach((id)=>{
            liveLayers.delete(id);
            const index= Array.from(liveLayers.keys()).indexOf(id);
            if(index !== -1)livelayerids.delete(index);
        });
        setMyPresence({selectedLayer:[]},{addToHistory:true});
    },[selection])
}