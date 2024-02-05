import { NextResponse } from "next/server";
import db from '@/libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const data = await request.json();

        const userEmailFound = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        const userNameFound = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (userEmailFound) {
            return NextResponse.json({message: 'User email already exists'}, {status: 409})
        }

        if (userNameFound) {
            return NextResponse.json({message: 'Username already exists'}, {status: 409})
        }

        const hasedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.user.create({data: {
            username: data.username,
            email: data.email,
            password: hasedPassword
        }})

        const {password: _, ...user} = newUser;

        return NextResponse.json({user}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}