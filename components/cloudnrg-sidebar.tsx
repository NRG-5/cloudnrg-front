"use client"
import * as React from "react"
import {
    CloudLightning,
    Files,
    ChartArea,
    Mail,
    FileSliders
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter, SidebarGroup, SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import NavUser from "@/components/nav-user";
import Link from "next/link";
import Cookies from "js-cookie";
import NavUnloggedUser from "@/components/nav-unlogged";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const navItems = [
    {
        icon: Files,
        name: "Dashboard",
        href: `/dashboard`
    },
    {
        icon: ChartArea,
        name: "Analitics",
        href: "/analitics"
    },
    {
        icon: FileSliders,
        name: "Api",
        href: "/api"
    },
    {
        icon: Mail,
        name: "Contact",
        href: "/contact"
    }

]

export default function CloudNRGSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{name : string  , email: string}>({
        name:  "Guest",
        email: "test@example.com",
    });

    useEffect(() => {
        async function fetchTokenData() {
            const tokenResponse = await fetch('/api/auth/cookie', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { token } = await tokenResponse.json();

            if (token) {

                setUser({ name : Cookies.get('username') || "Guest" , email: "test@example.com" })
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        fetchTokenData();

        //TODO: make this react when log in and log out

    }, []);

    function goToFixed(name : string, href: string){
        if (name === 'Dashboard') {
            const rootId = Cookies.get('rootId');
            return router.push(`${href}/${rootId}`);
        }
        return router.push(href);
    }


    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/" className={`h-fit`}>
                                <div className={`flex flex-row items-center`}>
                                    <span className="text-3xl font-semibold">Cloud</span>
                                    <span className="text-3xl font-bold text-primary">NRG</span>
                                    <CloudLightning className="h-8 w-8 ml-2" />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                navItems.map(({ icon: Icon, name, href }, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton
                                            asChild
                                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                                        >
                                            <div onClick={() => goToFixed(name,href) } >
                                                <Icon className="h-5 w-5" />
                                                <span className="text-base font-semibold">{name}</span>
                                            </div>

                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {
                    isLoggedIn ?
                        <NavUser user={user} />
                        :
                        <NavUnloggedUser />
                }
            </SidebarFooter>
        </Sidebar>
    );
}