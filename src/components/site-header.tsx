
import Organization from "@/app/[locale]/(dashboard)/dashboard/Organization"
import LocaleSelectLanguage from "@/app/[locale]/LocaleSelectLanguage"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { Rocket } from "lucide-react" // Icône


export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-(--header-height) items-center border-b bg-background p-6">
      <div className="flex w-full items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-orange-600">
            LocalAdd
          </Link>
          <Organization />
        </div>

        <div className="ml-auto flex items-center gap-9">
      
          <SidebarTrigger className="" />
          <LocaleSelectLanguage />
        </div>
      </div>
    </header>
  );
}
