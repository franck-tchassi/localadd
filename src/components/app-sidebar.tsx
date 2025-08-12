// app-sidebar.tsx
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { getCurrentSession } from "@/actions/auth"
import { NavMain } from "@/components/nav-main"
import Link from "next/link"
import { redirect } from "next/navigation"
import Image from "next/image"


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getCurrentSession()
  if (!session?.user) {
    redirect("/")
  }

  return (
    <Sidebar 
      collapsible="offcanvas" 
      {...props} 
      className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
     
      <SidebarContent className="px-0">
        <NavMain />
      </SidebarContent>
      
      
    </Sidebar>
  )
}