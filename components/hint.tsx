import {
    Tooltip, TooltipProvider, TooltipTrigger,TooltipContent

}from "@/components/ui/tooltip";


export interface hintProps {
    label:string,
    children:React.ReactNode
    side?:"top"|"bottom"|"left"|"right"
    align?:"start"|"center"|"end"
    sideOffset?:number
    alignOffset?:number
};

export const Hint =({
    label,
    children,
    side="top",
    align="center",
    sideOffset=0,
    alignOffset=0
}:hintProps)=>{
return(
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="text-white bg-black border-black" side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
                <p className="font-semibold capitalize">
                {label}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
}

