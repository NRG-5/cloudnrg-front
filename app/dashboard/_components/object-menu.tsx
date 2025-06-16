

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {EllipsisVerticalIcon} from "lucide-react";

export default function ObjectMenu(){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-8">
                    <EllipsisVerticalIcon className={`h-15 w-15`}/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">

                <DropdownMenuGroup>

                    <DropdownMenuItem>
                        Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        See History {/*TODO: refactor todo just when its a file*/}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Move To</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Root Folder</DropdownMenuItem>
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}