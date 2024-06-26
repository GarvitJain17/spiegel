"use client"
import { connectionIdtocolor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import {useOthers,useSelf} from "@liveblocks/react/suspense";
const MAX_SHOWN_USERS=2;


export const Participants = () => {
  const users =useOthers();
  const currentUser =useSelf();
  const hasMoreUsers =users.length > MAX_SHOWN_USERS;
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        <div className="flex gap-x-2">
          {users.slice(0,MAX_SHOWN_USERS)
          .map(({ connectionId,info }) => (
            <UserAvatar key={connectionId} src={info?.avatar} name={info?.name} fallback={info?.name?.[0] || "T"} borderColor={connectionIdtocolor(connectionId)}/>
          ))}
          {currentUser && (
            <UserAvatar 
            borderColor={connectionIdtocolor(currentUser.connectionId)}
            src={currentUser.info?.avatar}
            name={currentUser.info?.name}
            fallback={currentUser.info?.name?.[0]}
          />
          )}
          {hasMoreUsers && (
            <UserAvatar 
            name={`${users.length - MAX_SHOWN_USERS}more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
            />
          )}
        </div>
    </div>
  )
}
export default Participants;

export const ParticipantsSkeleton =  () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md animate-pulse w-[100px]"/>
  )
}