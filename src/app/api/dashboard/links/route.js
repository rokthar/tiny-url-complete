import { NextRequest, NextResponse } from "next/server"
import db from '@/libs/prisma'
import {getServerSession} from 'next-auth'
import {NextAuthOptions} from '../../auth/[...nextauth]/route'
 
export async function GET () {
    try {
        const session = await getServerSession(NextAuthOptions)
        
        if (!session) return NextResponse.json({message: 'Unauthorized'}, {status: 401})

        const user = await db.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) return NextResponse.json({message: 'Unauthorized'}, {status: 401})

        const links = await db.links.findMany({
            where: {
                user_id: user.id
            }
        })

        return NextResponse.json(links, {status: 200})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}