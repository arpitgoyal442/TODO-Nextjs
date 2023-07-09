import { time } from "console";
import mongoose from "mongoose";

let userSchema=mongoose.Schema({

    name:String,
    tasks:[
        {
            title:String,
            description:String,
            completed:{
                type:Boolean,
                default:false
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }
        }
    ]
})

export default mongoose.models.user || mongoose.model("user", userSchema);
