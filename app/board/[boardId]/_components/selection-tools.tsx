"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color,  } from "@/types/canvas";
import { useSelf } from "@liveblocks/react/suspense";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useMutation } from "@liveblocks/react/suspense";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}


export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selectedLayer);

    const moveToFront = useMutation(({ storage }) => {
      const liveLayerIds = storage.get("layerids");
    
      const arr = liveLayerIds.toArray();
      const selectedLayerIds = selection; // Assuming selection contains the IDs of the selected layers
      const nonSelectedLayerIds = arr.filter((id) => !selectedLayerIds.includes(id));
    
      // Reconstruct the layer order with selected layers moved to the back
      const newOrder = [...nonSelectedLayerIds, ...selectedLayerIds];
    
      // Update the liveLayerIds with the new order
      liveLayerIds.clear();
      newOrder.forEach((id) => {
        liveLayerIds.push(id);
      });
    }, [selection]);
    



const moveToBack = useMutation(({ storage }) => {
  const liveLayerIds = storage.get("layerids");

  const arr = liveLayerIds.toArray();
  const selectedLayerIds = selection; // Assuming selection contains the IDs of the selected layers
  const nonSelectedLayerIds = arr.filter((id) => !selectedLayerIds.includes(id));

  // Reconstruct the layer order with selected layers moved to the front
  const newOrder = [...selectedLayerIds, ...nonSelectedLayerIds];

  // Update the liveLayerIds with the new order
  liveLayerIds.clear();
  newOrder.forEach((id) => {
    liveLayerIds.push(id);
  });
}, [selection]);




    const setFill = useMutation((
      {storage},
      fill:Color,
    ) =>{
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill); // Assuming `set` method sets the fill color
    
      });
    },[selection,setLastUsedColor]);

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();
    if (!selectionBounds) return null;

    const x = selectionBounds.x + selectionBounds.width / 2 + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`
        }}
      >
        <ColorPicker
          onChange={setFill}
        />
        <div className="flex flex-col gap-y-0.5">
          <Hint label ="Bring to Front">
            <Button variant="board" size="icon" onClick={moveToFront}>
              <BringToFront/>
            </Button>
          </Hint>
          <Hint label ="Send to Back">
            <Button variant="board" size="icon" onClick={moveToBack}>
              <SendToBack/>
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board"
            size="icon"
            onClick={deleteLayers}>
              <Trash2/>
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);
SelectionTools.displayName = "SelectionTools";
