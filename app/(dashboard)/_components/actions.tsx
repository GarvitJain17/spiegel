"use client"

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {  DropdownMenu, DropdownMenuContentProps, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
    children :React.ReactNode;
    side?:DropdownMenuContentProps["side"];
    sideOffset?:number;
    id:string;
    title:string
};
export const Actions =({
    children,
    side,
    sideOffset,
    id,
    title
}:ActionProps)=>{
    const {onOpen} = useRenameModal();
    const {mutate,pending}=useApiMutation(api.board.remove)
    const onCopyLink = () =>{
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        )
        .then (() =>toast.success("Link Copied"))
        .catch((err) => toast.error("Error copying link"))
    }
    const onDelete = () =>{
        mutate({
            id
        })
        .then(() => toast.success("Board deleted"))
        .catch((err) => toast.error("Error deleting board"))
    
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60"
              onClick={(e) => e.stopPropagation() }
              side={side}
              sideOffset={sideOffset}
              >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="mr-2 h-4 w-4"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() =>{onOpen(id,title) }}>
                    <Pencil className="mr-2 h-4 w-4"/>
                    Rename
                </DropdownMenuItem>
            <ConfirmModal header="Delete Board?"
            description="This will delete board and all of its contents"
            disabled={pending}
            onConfirm={onDelete}>
                <Button variant="ghost" className="text-white p-3 cursor-pointer text-sm w-full justify-start font-normal bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 transition ease-in-out duration-150 " >
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Delete
                </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
