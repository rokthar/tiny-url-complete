import { NextResponse } from "next/server";
import db from '@/libs/prisma'
import {getServerSession} from 'next-auth'
import {NextAuthOptions} from '../auth/[...nextauth]/route'

export async function POST (request) {
    const data = await request.json();
    const shortUrl = Math.random().toString(36).slice(2);
    try {
        const session = await getServerSession(NextAuthOptions)

        let username = null

        if (!session){
            username = "free"
        }else{
            username = session.user.name
        }

        const user = await db.user.findUnique({
            where: {
                username: username
            }
        })
        
        if (!user) return NextResponse.json({message: 'Something went wrong'}, {status: 500})

        const new_url = await db.links.create({
            data: {
                url: data.url,
                short_url: shortUrl,
                user_id: user.id
            }
        })

        if (!new_url) return NextResponse.json({message: 'Something went wrong'}, {status: 500})

        return NextResponse.json({shortUrl}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})    
    }
    
};