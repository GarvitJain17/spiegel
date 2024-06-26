"use client"

import { memo } from "react"
import {  shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react/suspense"
import { Cursor } from "./cursor"
import Path from "./path"
import { colorToCss } from "@/lib/utils"


const Cursors = () => {
    const otherIds = useOthersConnectionIds()

    return (
        <>
            {otherIds.map((connectionId) => <Cursor key={connectionId} connectionId={connectionId} />)}
        </>
    )
}

function Drafts(){
    const others = useOthersMapped(
      (other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
      }),
      shallow
    );
    return (
      <>
        {/* All the drawing of other users in the room that are currently in progress */}
        {others.map(([key, other]) => {
          if (other.pencilDraft) {
            return (
              <Path
                key={key}
                x={0}
                y={0}
                points={other.pencilDraft}
                fill={other.penColor ? colorToCss(other.penColor) : "#CCC"}
              />
            );
          }
          return null;
        })}
      </>
    );
  }
export const CursorsPresence = memo(() => {
    
    return (
        <>
        <Drafts />
        <Cursors/>
        
        </>
    )
})

CursorsPresence.displayName = "CursorsPresence"