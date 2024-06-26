"use client"

import Image from "next/image"

import {
    useOrganization,
    useOrganizationList
}from "@clerk/nextjs"


import { cn } from "@/lib/utils"
import { Hint } from "@/components/hint"

interface Itemprops{
    id:string,
    name:string,
    imageUrl:string
}
export const Item =({
    id,
    name,
    imageUrl
}:Itemprops)=>{
    const {organization}=useOrganization();
    const {setActive}=useOrganizationList();

    const isActive= organization?.id === id;

    const onclick=()=>{
        if(!setActive) return;
        setActive({organization:id})
    }
    return(
        <div className="aspect-square relative h-9">
            <Hint label={name} side="right" align="start" sideOffset={18}>
            <Image
                fill
                alt={name}
                src={imageUrl}
                onClick={onclick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition", isActive && "opacity-100"
                )}
            />
            </Hint>
            
        </div>
    )

}