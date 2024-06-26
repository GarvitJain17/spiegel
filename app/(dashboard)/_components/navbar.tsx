"use client"
import { InviteButton } from "@/app/(dashboard)/_components/invite-button"
import { SearchInput } from "./search-input"
import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/clerk-react"

export const Navbar =()=>{
    const {organization} =useOrganization();
    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
            <SearchInput/>
            <div className="block lg:hidden flex-1">
            <OrganizationSwitcher hidePersonal 
      appearance={
        {
            elements:{
                rootBox:{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%",
                    maxWidth:"376px"
                }
            ,
            OrganizationSwitcherTrigger:{
                padding:"6px",
                width:"100%",
                borderRadius:"8px",
                backgroundColor:"white",
                border:"1px solid #E5E7EB",
                justifyContent:"center",
            }
        }
      }}/>
            </div>
            </div>
            {organization && (<InviteButton/>)}
            <UserButton/>
        </div>
    )
}