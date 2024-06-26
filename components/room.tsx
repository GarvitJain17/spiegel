"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";
import { Loading } from "@/app/board/[boardId]/_components/loading";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

// {"pk_dev_Y5C6okHiYYdUgu5A_FLgiSVoi513IPbJvUZ44k07yyBUKLkrSqbf5y7pj9x-whqj"}
interface RoomProps {
    children: ReactNode
    roomId: string
    fallback:NonNullable<ReactNode> | null

}
export function Room({ children,roomId }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={roomId} initialPresence={{cursor:null,selectedLayer:[],pencilDraft:null ,penColor:null}} initialStorage={{layers:new LiveMap<string,LiveObject<Layer>>(),layerids:new LiveList([]),}}>
        <ClientSideSuspense fallback={<Loading/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}