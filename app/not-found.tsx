import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage(){
    return (
        <div className={`p-6`}>
            <h1 className={`text-center text-4xl font-medium mb-4`}> Not Found </h1>
            <div className={``}>
                <Card className={`space-y-8 max-w-3xl mx-auto`}>
                    <CardContent>
                        <p className={`text-center text-lg`}>
                            The page you are looking for does not exist or has been moved.
                            Please check the URL or return to the home page.
                        </p>

                        <div className={`flex justify-center mt-4`}>
                            <Button asChild className={`mx-auto`}>
                                <Link href={`/`} >
                                    Go to Home
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}