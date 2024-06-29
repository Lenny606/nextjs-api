import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import Types from 'mongoose';

//object for DB
const ObjectId = require("mongoose").Types.ObjectId
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

        return new NextResponse(JSON.stringify({message: "user created", data: user}), {
            status: 201, headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch
        (err: any) {
        return new NextResponse('Error in creating users ' + err.message, {status: 500});
    }
}
export const PATCH = async (req: Request, res: Response) => {
    try {
        const body = await req.json();
        const {userId, userNameUpdated} = body
        await connect()
        if (!userId || !userNameUpdated) {
            return new NextResponse(JSON.stringify({message: 'User ID or Name not found'}), {status: 400});
        }
        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'User ID is not valid'}), {status: 400});
        }
        const userUpdated = await User.findOneAndUpdate(
            {
                _id: new ObjectId(userId)
            },
            {
                username: userNameUpdated
            },
            {
                new: true //return updated user , false returns old user
            }
        )

        if (!userUpdated) {
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400})
        }
        return new NextResponse(JSON.stringify({message: "User updated", data: userUpdated}), {status: 201})
    } catch (err: any) {
        return new NextResponse('Error in updating users ' + err.message, {status: 500});
    }
}
export const DELETE = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId');

        if (!userId) {
            return new NextResponse(JSON.stringify({message: "UserId not found"}), {status: 400})
        }
        if (!ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'User ID is not valid'}), {status: 400});
        }

        await connect();
        const deletedUser = await User.findByIdAndDelete(
            new ObjectId(userId)
        )
        if (!deletedUser) {
            return new NextResponse(JSON.stringify({message: "User not found"}), {status: 400})
        }

        return new NextResponse(JSON.stringify({message: "User deleted", data: deletedUser}), {status: 204})

    } catch (err: any) {
        return new NextResponse('Error in deleting users ' + err.message, {status: 500});
    }
}
