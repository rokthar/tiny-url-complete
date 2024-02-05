import { NextResponse } from "next/server"
import db from '@/libs/prisma'
import {useSession} from 'next-auth/react'
export async function GET () {
    try {
        const {data: session, status} = useSession()
        console.log(session);

        const links = await db.links.findMany()
        return NextResponse.json({links}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}