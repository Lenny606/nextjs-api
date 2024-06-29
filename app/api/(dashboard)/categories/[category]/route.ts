import {NextResponse} from "next/server";
import connect from "@/lib/db";
import User from "@/lib/models/users";
import Category from "@/lib/models/category";
import {Types} from 'mongoose';

export const PATCH = async (request: Request, context: { params: any }) => {
    //id as dynamic parameter from url in context => [category]
    const categoryId = context.params.category

    try {
        const body = await request.json()
        const title = body.title

        const {searchParams} = new URL(request.url)
        const userId = searchParams.get('userId');

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message: 'User ID is not valid or missing'}), {status: 400});
        }

        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({message: 'Category ID is not valid or missing'}), {status: 400});
        }
        await connect();

        const user = await User.findById(userId)
        if (!user) {
            return new NextResponse(JSON.stringify({message: 'User not found in Db'}), {status: 400});
        }

        const category = await Category.findOne({_id: categoryId, user: userId})
        if (!category) {
            return new NextResponse(JSON.stringify({message: 'Category not found in Db'}), {status: 400});
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            {title: title},
            {new: true}
        )
        await updatedCategory.save();

        return new NextResponse(JSON.stringify(updatedCategory), {status: 200})
    } catch (err) {
        return new NextResponse(JSON.stringify({message: 'Error in updating categories ' + err.message,}), {status: 500});
    }
}