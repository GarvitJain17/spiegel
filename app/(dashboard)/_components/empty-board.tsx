"use client"

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";

import Image from "next/image"; 
import { useOrganization } from "@clerk/clerk-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const EmptyBoard =()=>{
    const router = useRouter();
    const {mutate,pending}=useApiMutation(api.board.create);
    const {organization}=useOrganization()
    const onClick=()=>{
        if(!organization)return;
        mutate({
            orgId:organization.id,
            title:"Untitled"
        })
        .then ((id) =>{
            toast.success("Board Created");
            router.push(`/board/${id}`)
        })
        .catch(() =>{
            toast.error("Failed to Create Board")
        })
    }
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
            src="/emptyboard.jpeg"
            alt="Empty Board"
            width={140}
            height={140}
            />
            <h2 className="text-2xl font-semibold mt-6">No Boards</h2>
            <p className="text-muted-foreground testg-sm mt-2">Create Boards to collaborate</p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create Board
                </Button>
            </div>
        </div>
    )
}
