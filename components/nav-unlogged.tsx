import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar";
import {BellIcon, LogIn, LogOutIcon, MoreVerticalIcon, UserCircleIcon} from "lucide-react";
import {redirect} from "next/navigation";


export default function NavUnloggedUser() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={() => redirect("/login")}
                >

                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium"> Guest </span>
                        <span className="truncate text-xs text-muted-foreground">
                                        Log in to access
                                    </span>
                    </div>
                    <LogIn className="ml-auto size-4" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}