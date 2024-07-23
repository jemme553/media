export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const res = await fetch(`http://localhost:3001/posts/${id ? `getmyphotos/${id}` : 'getphotos'}`, { next: { revalidate: 10 } })
    const posts = await res.json()
    return Response.json(posts)
}