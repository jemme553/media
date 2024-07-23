import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const file = await req.json();
        const id = file.userId.toString();
        // Define base directories
        const baseDirectory = process.cwd();
        const PicturesDirectory = path.join(baseDirectory, 'public', 'photos', id, 'profilePictures');

        // Ensure directories exist asynchronously
        await Promise.all([
            fs.mkdir(PicturesDirectory, { recursive: true }),
        ]);

        // Determine file category and handle accordingly
        let fullPath = path.join(PicturesDirectory, file.fileName);
        let filePath = path.join('photos', id, 'profilePictures', file.fileName)
        // Write file asynchronously
        await fs.writeFile(fullPath, Buffer.from(file.blob, 'base64'));

        // Update file object with URL
        file.url = filePath;
        file.blob = ''
        // Make HTTP POST request
        const res = await fetch(`http://localhost:3001/posts/changeprofilepicture`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ data: file })
        });

        const result = await res.json();
        return Response.json({ data: result });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ err: error.message });
    }
}