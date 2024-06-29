import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import Category from "@/lib/models/category";
import {Types} from 'mongoose';

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'User ID is not valid or missing'}), {status: 400});
        }
        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({message: 'User not found in Db'}), {status: 400});
        }
        const categories = await Category.find({
            user: new Types.ObjectId(userId)
        })
        return new NextResponse(JSON.stringify(categories), {status: 200})
    } catch (err) {
        return new NextResponse(JSON.stringify({message: 'Error in fetching categories ' + err.message,}), {status: 500});
    }
}
export const POST = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'User ID is not valid or missing'}), {status: 400});
        }
        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({message: 'User not found in Db'}), {status: 400});
        }
        const body = await request.json()
        const title = body.title
        await connect();
        const newCategory = new Category({
            title: title,
            user: new Types.ObjectId(userId)
        })
        await newCategory.save();

        return new NextResponse(JSON.stringify(newCategory), {status: 201})
    } catch (err) {
        return new NextResponse(JSON.stringify({message: 'Error in creating categories ' + err.message,}), {status: 500});
    }
}