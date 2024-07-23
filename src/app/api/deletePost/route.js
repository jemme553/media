import fs from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const baseDirectory = process.cwd();
        const data = await req.json();
        const url = data.url.replace(/\\/g, '/')
        const file = path.join(baseDirectory, 'public', url);
        await fs.rm(file)

        const res = await fetch(`http://localhost:3001/posts/deletepost`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ data: data })
        });

        const result = await res.json();
        return Response.json({ data: result });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ err: error.message });
    }
}