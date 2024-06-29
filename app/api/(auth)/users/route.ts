import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";

export const GET = async () => {

    try {
        await connect()
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200})
    } catch (err: any) {
        return new NextResponse('Error in fetchingg users ' + err.message, {status: 500});
    }

};
export const POST = async (req: Request, res: Response) => {
    try {
        const body = await req.json();
        await connect()
        const user = new User(body)
        await user.save();

        return new NextResponse(JSON.stringify({message: "user created", data: user}), {status: 201})
    } catch (err: any) {
        return new NextResponse('Error in creating users ' + err.message, {status: 500});
    }
}

