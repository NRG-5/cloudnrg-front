import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {CloudLightning} from "lucide-react";

export default function CloudNRGHeader(){
    return (
        <header
            className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
                <div className={`flex items-center justify-center`}>
                    <SidebarTrigger className="-ml-1"/>
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4"
                    />
                </div>
                <div className={`flex items-center justify-center`}>
                    <h1 className="text-base font-medium">Cloud<strong className={`text-primary`}>NRG</strong></h1>
                    <CloudLightning className="h-8 w-8 ml-2" />
                </div>

            </div>
        </header>
    );
}