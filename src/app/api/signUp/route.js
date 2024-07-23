export async function POST(req) {
    try {
        const data = await req.json();
        const res = await fetch(`http://localhost:3001/users/newuser`, {
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