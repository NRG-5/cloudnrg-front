import {NextResponse} from "next/server";


export async function POST(req : Request) {
    const incomingFormData = await req.formData();


    const userId = incomingFormData.get('userId');
    const folderId = incomingFormData.get('folderId');
    const file = incomingFormData.get('file'); // This is a File object


    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ status: 'error', message: ' userId is missing or invalid.' }, { status: 400 });
    }
    if (!folderId || typeof folderId !== 'string') {
        return NextResponse.json({ status: 'error', message: ' folderId is missing or invalid.' }, { status: 400 });
    }

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ status: 'error', message: 'File is missing or invalid.' }, { status: 400 });
    }
    if (file.size === 0) {
        return NextResponse.json({ status: 'error', message: 'File is empty.' }, { status: 400 });
    }

    // Prepare FormData to send to Gofile API
    const gofileFormData = new FormData();
    gofileFormData.append('userId', userId);
    gofileFormData.append('folderId', folderId);
    // The third argument to append for a File object is the filename.
    gofileFormData.append('file', file, file.name);

    const cloudnrgApiUrl = 'http://localhost:8090/api/v1/files/upload';


    const cloudnrgResponse = await fetch(cloudnrgApiUrl, {
        method: 'POST',
        body: gofileFormData
    });

    const data = await cloudnrgResponse.json();

    if (!cloudnrgResponse.ok) {
        return NextResponse.json({ status: 'error', message: data.message || 'Failed to upload file.' }, { status: cloudnrgResponse.status });
    }
    return NextResponse.json({ status: 'ok', data: data }, { status: 200 });

}