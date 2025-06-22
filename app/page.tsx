
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function Home() {

    return (
        <div className={`p-6`}>
            pag principal

            <Button variant={`secondary`} asChild>
                <Link href="/login">
                    Login
                </Link>
            </Button>

            <Button variant={`secondary`} asChild>
                <Link href="/sign-up">
                    Sign Up
                </Link>
            </Button>


        </div>
    );
}
