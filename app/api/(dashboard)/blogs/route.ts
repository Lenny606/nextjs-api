import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import Blog from "@/lib/models/blog";
import Category from "@/lib/models/category";
import {Types} from 'mongoose';

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId: any = searchParams.get('userId');
        const categoryId: any = searchParams.get('categoryId');
        const searchKey = searchParams.get('searchKey') as string;
        const page = parseInt(searchParams.get('page') || "1")
        const limit = parseInt(searchParams.get('limit') || "10")

        //TODO validation

        await connect();

        const user = await User.findById(userId);
        const category = await Category.findById(categoryId);

        if (!user || !category) {
            return new NextResponse(
                JSON.stringify({message: "User or Category not found"}), {status: 404}
            )
        }

        //PAGINATION
        const filter: any = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId)
        }
        //mongo clauses
        // search parameters in title or description, case insensitive option
        if (searchKey) {
            filter.$or = [
                {
                    title: {$regex: searchKey, $options: "i"}
                },
                {
                    description: {$regex: searchKey, $options: "i"}
                }
            ]
        }

        //skip
        const skip = (page - 1) * limit

        const blogs = await Blog.find(filter)
            .sort({createdAt: "asc"})
            .skip(skip)
            .limit(limit)

        return new NextResponse(
            JSON.stringify({data: blogs}), {status: 200}
        )
    } catch (err: any) {
        return new NextResponse(
            JSON.stringify({message: "Error while getting blogs " + err.message}), {status: 500}
        )
    }
}