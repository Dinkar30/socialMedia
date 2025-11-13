import mongoose , {Schema} from 'mongoose';

const postSchema = new Schema({
     caption: {
        type: String,
     },
     content: {
        type: String,
        required: true,
     },
     author: {
        type: Schema.Types.ObjectId,
        ref: "User"
     },
     likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
     }],
     comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
     ]

},{timestamps: true})

export const Post = mongoose.model("Post",postSchema)