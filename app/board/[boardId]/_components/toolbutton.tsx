"use client"

import { LucideIcon } from "lucide-react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
    label:string;
    icon:LucideIcon;
    onclick:() => void;
    isActive?:boolean;
    isDisabled?:boolean;

};
export const ToolButton = ({label,icon:Icon,onclick,isActive,isDisabled}:ToolButtonProps) => {
    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                variant={isActive?"boardActive":"board"}
                size="icon"
                onClick={onclick}
                disabled={isDisabled}
            >
                <Icon strokeWidth={1.5} size={20} color={isActive ? "black" : "gray"} />
            </Button>
        </Hint>
    )
}