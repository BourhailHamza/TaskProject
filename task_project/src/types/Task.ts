import User from "./User";

export default interface Task {
    _id : string,
    title : string;
    description : string;
    creationDate : Date;
    endDate : Date;
    category : string;
    isDone : boolean;
    user: any;
}; 