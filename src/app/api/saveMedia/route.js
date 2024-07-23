import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const file = await req.json();
        const id = file.userId.toString();
        // Define base directories
        const baseDirectory = process.cwd();
        const PicturesDirectory = path.join(baseDirectory, 'public', 'photos', id);
        const VideosDirectory = path.join(baseDirectory, 'public', 'videos', id);

        // Ensure directories exist asynchronously
        await Promise.all([
            fs.mkdir(PicturesDirectory, { recursive: true }),
            fs.mkdir(VideosDirectory, { recursive: true }),
        ]);

        let filePath,fileFullPath;
        // Determine file category and handle accordingly
        if (file.category === 'picture') {
            filePath = path.join('photos', id, file.fileName);
        } else if (file.category === 'video') {
            filePath = path.join('videos', id, file.fileName);
        }

        // Write file asynchronously
        fileFullPath = path.join(baseDirectory, 'public', filePath);
        await fs.writeFile(fileFullPath, Buffer.from(file.blob, 'base64'));

        // Update file object with URL
        file.url = filePath;
        file.blob = ''
        // Make HTTP POST request
        const res = await fetch(`http://localhost:3001/posts/newpost`, {
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