import Link from "next/link";
import { Separator } from "@/components/ui/separator"

const fastLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Contact Us", href: "/contact" }
]

export default function CloudNRGFooter(){
    return (
        <footer className={`flex flex-row justify-between p-6 border-t `}>
            <div className={`flex flex-row gap-4`}>
                { fastLinks.map(({name, href},index) => (
                 <div key={index} className={`flex flex-row gap-4`}>
                     <Link href={href} className={`hover:underline`}>
                         {name}
                     </Link>
                     <Separator orientation="vertical" />
                 </div>
                )) }
            </div>
            <div>
                CloudNRG SAC © 2025, made with ❤️ by NRG-5 Team
            </div>
        </footer>
    );
}