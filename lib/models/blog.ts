import {Schema, models, model} from 'mongoose';

const BlogSchema = new Schema(
    {
        title: {type: 'string', required: true},
        description: {type: 'string', required: false},
        user: { type: Schema.Types.ObjectId, ref: "User"}, //relations
        category: { type: Schema.Types.ObjectId, ref: "Category"} //relations
    },
    {
        timestamps: true
    }
);
const Blog = models.Blog || model('Blog', BlogSchema)
export default Blog;