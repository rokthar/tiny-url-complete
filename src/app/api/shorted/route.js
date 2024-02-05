import { NextResponse } from "next/server";
import db from '@/libs/prisma'

export async function POST (request) {
    const data = await request.json();
    const shortUrl = Math.random().toString(36).slice(2);
    try {
        const new_url = await db.links.create({
            data: {
                url: data.url,
                short_url: shortUrl
            }
        })
        if (!new_url) return NextResponse.json({message: 'Something went wrong'}, {status: 500})

        return NextResponse.json({shortUrl}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})    
    }
    
};