import mongoose, { Schema , Model , model } from "mongoose";
import { User, IUser } from "./User";

interface ITask {
    title : string;
    description : string;
    creationDate : Date;
    endDate : Date;
    category : string;
    isDone: boolean;
    user : Schema.Types.ObjectId;
}; 

const TaskSchema  = new Schema<ITask>({

    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    creationDate : {
        type : Date,
        required : false
    },
    endDate : {
        type : Date
    },
    category : {
        type : String
    },
    isDone : {
        type : Boolean
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

const Task : Model<ITask> = model('Task',TaskSchema);

export {Task, ITask}
