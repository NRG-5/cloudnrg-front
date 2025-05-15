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

const navItems = [
    {
        icon: Files,
        name: "Dashboard",
        href: "/dashboard"
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

const userData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/pfp.jpg",
}

export default function CloudNRGSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/dashboard" className={`h-fit`}>
                                <div className={`flex flex-row items-center`}>
                                    <span className="text-3xl font-semibold">CloudNRG</span>
                                    <CloudLightning className="h-8 w-8 ml-2" />
                                </div>
                            </a>
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
                                            <a href={href}>
                                                <Icon className="h-5 w-5" />
                                                <span className="text-base font-semibold">{name}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userData}/>
            </SidebarFooter>
        </Sidebar>
    );
}