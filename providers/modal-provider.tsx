"use client"

import { RenameModal } from "@/components/modals/rename-modal"
import { useEffect, useState } from "react"

export const ModalProvider =() =>{
    const [isMounted,setisMounted]=useState(false);
    useEffect (() =>{
        setisMounted(true);

    },[])
    if(!isMounted)return null;
    return (
        <>
        <RenameModal/>
        </>
    )
}