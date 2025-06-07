import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { TriangleAlert} from "lucide-react";
import {Separator} from "@/components/ui/separator";


const verbColorMap: Record<string, string> = {
    POST: "bg-green-600",
    GET: "bg-blue-600",
    UPDATE: "bg-yellow-600",
    DELETE: "bg-red-600",
};

const endpointList = [

    {
        title: "Upload File",
        verb: "POST",
        url: "https://api.cloudnrg.com/v1/files/upload",
        description: "Upload a file to your CloudNRG account.",
        parameterType: "Content-Type: multipart/form-data",
        parameters: [
            {
                name: "file",
                type: "File",
                required: true,
                description: "The file to upload. Must be a valid file object."
            },
            {
                name: "folderId",
                type: "string",
                required: false,
                description: "The ID of the folder to upload the file to. If not provided, the file will be uploaded to the root folder."
            }
        ],
        tip: "Ensure the file size does not exceed the maximum allowed limit (10MB)."
    },
    {
        title: "Get a File",
        verb: "GET",
        url: "https://api.cloudnrg.com/v1/files/{fileId}",
        description: "Retrieve a file from your CloudNRG account.",
        parameterType: "Path Parameters",
        parameters: [
            {
                name: "fileId",
                type: "string",
                required: true,
                description: "The ID of the file to retrieve."
            }
        ]
    }
]

export default function ApiDocsPage(){
    return (
        <>
            <div className={`p-6`}>
                <div className={`space-y-8 mb-6`}>
                    <h1 className={`text-center text-4xl font-medium mb-4`}>
                        Cloud<strong className={`text-primary`}>NRG</strong> API Documentation
                    </h1>
                    <p className={`text-center`}>
                        Integrate CloudNRG&#39;s powerful storage and content delivery capabilities into your
                        applications
                        with our REST API.
                    </p>
                </div>
                <h2 className={`text-2xl font-medium mb-4`}> Endpoint Usage </h2>
                <div className={`space-y-6 mb-4`}>

                    <Card>
                        <CardContent>
                            <h3 className={`text-xl font-medium mb-4`}> Authorization </h3>
                            <p className={`mb-2 `}>
                                All API requests require an API token for authentication. Include your token in the
                                request headers:
                            </p>
                            <div className={`p-4 bg-muted rounded-md text-blue-400 font-mono`}>
                                <span> Authorization: Bearer YOUR_API_TOKEN </span>
                            </div>

                            <p className={`mt-2`}>
                                Get your API token from your profile page.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className={`text-xl font-medium mb-4`}> Rate Limiting </h3>
                            <p className={`mb-2 `}>
                                Rate limits are enforced on a per-endpoint basis.
                                When exceeded, requests will receive a <code
                                className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                                429 Too Many Requests </code> response.
                            </p>
                            <div className={`p-4 bg-muted rounded-md `}>
                                <p className={`mb-2 `}> For security reasons, specific rate limit values are not
                                    publicly disclosed.
                                    Normal API usage should not trigger these limits. </p>
                                <div
                                    className={`p-4 bg-yellow-400/10 rounded-md text-yellow-400 font-mono flex items-center gap-2 `}>
                                    <div className={`w-fit`}>
                                        <TriangleAlert className={`w-4 h-4`}/>
                                    </div>
                                    <p>Repeatedly exceeding rate limits may result in automatic IP bans.</p>
                                </div>
                            </div>


                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className={`text-xl font-medium mb-4`}> Account Structure</h3>
                            <p className={`mb-2 `}>
                                Each account is assigned a permanent root folder that serves as the base for all content
                                organization:
                            </p>
                            <div className={`p-4 bg-muted rounded-md `}>
                                <div className={`font-mono`}>
                                    <span className={`text-primary`}>Account</span> -&gt; <span
                                    className={`text-blue-400`}>Root Folder</span> -&gt; <span>Contents (Files & Subfolders)</span>
                                </div>

                                <p className={`text-muted-foreground`}>All files and subfolders must exist within this
                                    root structure.
                                    The root folder cannot be deleted or moved.</p>
                            </div>


                        </CardContent>
                    </Card>

                </div>
                <h2 className={`text-2xl font-medium mb-4`}> Endpoints </h2>
                <div className={`space-y-8`}>
                    {
                        endpointList.map((endpoint, index) => (
                            <Card key={index}>
                                <CardContent>
                                    <h3 className={`text-xl font-medium mb-4`}> {endpoint.title} </h3>
                                    <div className={`flex items-center gap-2`}>
                                        <div className={`font-bold px-1 rounded ${verbColorMap[endpoint.verb] || "bg-gray-400"}`}>
                                            {endpoint.verb}
                                        </div>

                                        <span> {endpoint.url} </span>
                                    </div>
                                    <Separator className="my-4"/>
                                    <p className={`mb-2 `}>
                                        {endpoint.description}
                                    </p>
                                    <div>
                                        <div className={`mb-2`}>
                                            <span className={`font-medium mr-4`}>Parameters</span>
                                            <span className={`text-muted-foreground`}>
                                                {endpoint.parameterType}
                                            </span>

                                        </div>
                                        <div className={`space-y-4`}>
                                            {
                                                endpoint.parameters && endpoint.parameters.length > 0 ? (

                                                    endpoint.parameters.map((param, idx) => (
                                                        <div key={idx} className={`bg-background/50 p-4 rounded`}>
                                                            <div className={`flex items-center gap-2`}>
                                                                <span className={`text-primary`}> {param.name} </span>
                                                                <div className={`rounded bg-muted px-1.5 text-muted-foreground`}>
                                                                    {param.type}
                                                                </div>
                                                                <div className={`rounded bg-muted px-1.5 ${param.required ? (`text-blue-300`) : (`text-muted-foreground`) } `}>
                                                                    { param.required ? (<span> required </span>) : (
                                                                        <span> optional </span>)}
                                                                </div>
                                                            </div>
                                                            <p>
                                                                {param.description}
                                                            </p>
                                                        </div>
                                                    ))

                                                ) : (
                                                    <p className={`text-muted-foreground`}>No parameters required.</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </>
    );
}