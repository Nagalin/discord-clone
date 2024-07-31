import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
       const server = await prisma.server.findFirst({
        where: {
            serverName: 'mocked-server'
        }
       })

       await prisma.
       
    } catch (error) {
        console.error(error)
        return NextResponse.json('Error occurs', { status: 500 })
    }
}
