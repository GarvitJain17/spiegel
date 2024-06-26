"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"
import { DialogClose } from "@radix-ui/react-dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


export const RenameModal = () =>{
    const {mutate,pending} =useApiMutation(api.board.update)
    const{
        isOpen,
        onClose,
        initialValues,
    }=useRenameModal();

    const [title,setTitle]=useState(initialValues.title);
    useEffect(() =>{
        setTitle(initialValues.title);
    },[initialValues.title]);
    
    const onSubmit:FormEventHandler<HTMLFormElement> = (e) =>{
        e.preventDefault();
        mutate({
            id:initialValues.id,
            title,
        })
        .then(() =>{
            toast.success("Board Renamed")
            onClose()
        
        })
        .catch(() =>{
            toast
        })
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Board Title</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter New Title for the board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <input 
                    disabled={pending}
                    required
                    maxLength={60}
                    placeholder="Board Title"
                    onChange={(e) =>setTitle(e.target.value)} />
                </form >
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button disabled ={pending} type="submit">Save</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}