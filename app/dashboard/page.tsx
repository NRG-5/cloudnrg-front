import {redirect} from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage(){
    const rootId = Cookies.get('rootId');
    redirect(`/dashboard/${rootId ? rootId : "default"}`);
}