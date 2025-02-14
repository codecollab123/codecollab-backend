import mongoose,{Schema,Document,Model} from "mongoose";
import {v4 as uuidv4} from "uuid";

export interface StudySoloInterface extends Document{
    _id:string;
    userId:string;
    background:string;
    music:string;
    video?:string;
    quote?:string;
    todolist?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

const StudySoloInterfaceSchema : Schema<StudySoloInterface>=new Schema({
    _id:{
        type:String,
        default:uuidv4
    },
    userId:{
        type:String,
        required:true
    },
    background:{
        type:String,
        required:true
    },
    music:{
        type:String,
        required:true
    },
    video:{
        type:String
    },
    quote:{
        type:String
    },
    todolist:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});
const StudySoloModel:Model<StudySoloInterface>=mongoose.model("StudySolo",StudySoloInterfaceSchema);
export default StudySoloModel;