"use client"
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
import { connectionIdtocolor } from "@/lib/utils";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);
    const name = info?.name || "Team-mate";
    if (!cursor){
        return null;
    } // Exit early if cursor data is not available

    const { x, y } = cursor;
    
    // console.log(info,cursor)
    // Log cursor information for debugging
    console.log(`Cursor for connectionId ${connectionId}:`, cursor);

    return (
        
        <foreignObject
            style={{
                transform: `translate(${x}px, ${y}px)` // Adjust positioning as needed
            }}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
        >
            
            <MousePointer2
                className="h-5 w-5"
                style={{
                    fill: connectionIdtocolor(connectionId),
                    color: connectionIdtocolor(connectionId),
                }}
            />
            <div
                className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
                style={{
                    backgroundColor: connectionIdtocolor(connectionId),
                }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";
