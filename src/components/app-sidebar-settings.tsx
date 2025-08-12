"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

export function AppSidebarSettings(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="border-r bg-gray-100/90 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60"
    >
      <SidebarContent className="px-0">
        {/* Ici ton contenu spécifique aux paramètres */}
        <div>Paramètres du compte</div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">Footer Settings</SidebarFooter>
    </Sidebar>
  );
}
