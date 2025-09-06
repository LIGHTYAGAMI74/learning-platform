import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request) {  

    const { email, name } = await request.json();

    const user= await db.select().from(usersTable).where(eq(usersTable.email,email))
    if(user?.length==0){
        const result = await db.insert(usersTable).values({ email:email, name:name }).returning(usersTable)

        return NextResponse.json({result });
    }
return NextResponse.json({ user: user[0] });
    // Here you can handle the data as needed
}