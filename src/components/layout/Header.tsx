"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import LocaleSelectLanguage from "@/app/[locale]/LocaleSelectLanguage"

const navLinks = [
    {
        name: "Fonctionnalités",
        href: "#fonctionnalites",
        items: [
            { title: "Gestion des clients", href: "#gestion-clients", description: "Suivi complet de votre clientèle" },
            { title: "Analytics", href: "#analytics", description: "Tableaux de bord et statistiques" },
            { title: "Réservations", href: "#reservations", description: "Système de prise de rendez-vous" },
        ]
    },
    {
        name: "Secteurs",
        href: "#secteurs",
        items: [
            { title: "Restauration", href: "#restauration", description: "Solutions pour restaurants et cafés" },
            { title: "Commerce", href: "#commerce", description: "Outils pour boutiques physiques" },
            { title: "Services", href: "#services", description: "Pour les professionnels de service" },
        ]
    },
    {
        name: "Tarifs",
        href: "#tarifs",
        items: [
            { title: "Starter", href: "/pricing", description: "Parfait pour les petites entreprises" },
            { title: "Pro", href: "/pricing", description: "Pour les entreprises en croissance" },
            { title: "Enterprise", href: "/pricing", description: "Solution complète sur mesure" },
        ]
    },
    {
        name: "Apropos",
        href: "#apropos",
        items: [
            { title: "Notre équipe", href: "#equipe", description: "Découvrez qui nous sommes" },
            { title: "Contact", href: "#contact", description: "Comment nous joindre" },
            { title: "Carrières", href: "#carrieres", description: "Rejoignez notre équipe" },
        ]
    },
]

const Header = () => {
    const [open, setOpen] = useState(false)

    return (
        <header className="w-full border-b bg-background/80 backdrop-blur sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-10">
                {/* Logo */}
                <Link href="/dashboards" className="flex items-center gap-4 w-full ">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon text-orange-500  icon-tabler icons-tabler-outline icon-tabler-map-2 scale-[2.5] "><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" /><path d="M9 4v13" /><path d="M15 7v5.5" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
                    <span className="text-2xl font-semibold text-orange-500 ml-4">Locale Add</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.name}>
                                    {link.items ? (
                                        <>
                                            <NavigationMenuTrigger className="text-base font-semibold text-muted-foreground hover:text-orange-500 data-[active]:text-orange-500 data-[state=open]:text-orange-500 px-3 py-2 rounded-lg transition-colors duration-200">
                                                {link.name}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                    {link.items.map((item) => (
                                                        <ListItem
                                                            key={item.title}
                                                            title={item.title}
                                                            href={item.href}
                                                        >
                                                            {item.description}
                                                        </ListItem>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link href={link.href} legacyBehavior passHref>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle() + " text-base font-semibold text-muted-foreground hover:text-orange-500 px-3 py-2 rounded-lg transition-colors duration-200"}>
                                                {link.name}
                                            </NavigationMenuLink>
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">
                    <div className="relative">
                        <LocaleSelectLanguage />
                    </div>
                    <Link href="/auth/sign-in">
                        <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-50 hover:text-orange-600 transition-colors font-semibold px-5 py-2 rounded-lg shadow-none">Se connecter</Button>
                    </Link>
                    <Link href="/demo">
                        <Button size="sm" className="bg-gradient-to-r cursor-pointer from-orange-400 to-orange-600 text-white font-bold px-5 py-2 rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transition-all border-0">Demander un démo</Button>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-orange-50 focus:outline-none border border-orange-100"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="size-7 text-orange-500" />
                </button>
            </div>

            {/* Mobile Nav */}
            {open && (
                <div className="md:hidden bg-background border-t px-4 pb-4 animate-in fade-in slide-in-from-top-4 shadow-lg rounded-b-xl">
                    <nav className="flex flex-col gap-2 mt-2">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-lg font-semibold text-muted-foreground hover:text-orange-500 transition-colors py-2 block rounded-lg px-2"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.name}
                                </Link>
                                {link.items && (
                                    <div className="ml-4 mt-1 flex flex-col gap-1">
                                        {link.items.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="text-base font-medium text-muted-foreground/80 hover:text-orange-500 transition-colors py-1 rounded px-2"
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="flex flex-col gap-2 mt-4">
                        <Link href="/login" onClick={() => setOpen(false)}>
                            <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 font-semibold rounded-lg">Se connecter</Button>
                        </Link>
                        <Link href="/demo" onClick={() => setOpen(false)}>
                            <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 border-0">Demander un démo</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Header