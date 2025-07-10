

import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar";
import {BellIcon, LogIn, LogOutIcon, MoreVerticalIcon, UserCircleIcon} from "lucide-react";
import {redirect} from "next/navigation";
import Cookies from "js-cookie";


export default function NavUnloggedUser() {

    function handleClick() {
        const userId = Cookies.get('userId')

        if (userId) {
            redirect(`/profile/${userId}`);
        } else {
            redirect('/login');
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    onClick={() => handleClick()}
                >

                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium"> Profile </span>
                        <span className="truncate text-xs text-muted-foreground">
                                        get your token
                                    </span>
                    </div>
                    <UserCircleIcon className="ml-auto size-4" />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}