import { NextResponse } from "next/server";
import db from '@/libs/prisma'

export async function POST (request) {
    const data = await request.json();
    const shortUrl = data.path

    try {
        const url = await db.links.findUnique({
            where: {
                short_url: shortUrl
            }
        })

        if (!url) return NextResponse.json({message: 'Something went wrong'}, {status: 500})

        return NextResponse.json({url}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
};