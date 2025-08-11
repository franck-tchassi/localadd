import AccountInfo from "@/app/[locale]/(dashboard)/dashboard/account/AccountInfo"
import Organization from "@/app/[locale]/(dashboard)/dashboard/Organization"
import LocaleSelectLanguage from "@/app/[locale]/LocaleSelectLanguage"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"


export function SiteHeader() {
  const unreadNotificationsCount = 0 // Remplacez par votre logique réelle de comptage

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Organization />

        <div className="ml-auto flex items-center gap-2">
          <LocaleSelectLanguage />

          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <AccountInfo />
          </Button>
        </div>
      </div>
    </header>
  )
}
