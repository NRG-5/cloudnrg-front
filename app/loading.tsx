import {LoaderCircle} from "lucide-react";

export default function LoadingPage(){

    return (
        <div className={`p-6 h-full flex items-center justify-center`}>
            <LoaderCircle className={`animate-spin h-30 w-30`} />
        </div>
    );
}