"use client"
import Image from "next/image";
import { CreateOrganization } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const EmptyOrg=()=>{
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
            src="/spiegel.jpg"
            alt="empty org"
            width={200}
            height={200}
            />
            <h2 className="text-lg font-bold mt-6">Welcome to Board</h2>
            <p className="text-muted-foreground test-sm mt-2">Create and Organization to get started</p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="size-lg">Create Organization</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
