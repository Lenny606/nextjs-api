import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";

export const GET = async () => {

    try {
        await connect()
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (err: any) {
        return new NextResponse('Error in feetchin users ' + err.message, { status: 500});
    }

};

