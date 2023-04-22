import express, { Application, Request, Response } from 'express';
import  { connect } from 'mongoose';
import { getAllUsers, getUserById, addUser, deleteUser } from './handlers/User';
import { getAllTasks, getTaskById, addTask, modifyTaskById, deleteTask, getTasksByUser } from './handlers/Task';
import cors from 'cors';

const port: number = 8080;

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

//Routes for users
app.get('/user/:id', getUserById);
app.get('/users', getAllUsers );
app.post('/user', addUser);
app.delete('/user/:id', deleteUser);

//Routes for tasks
app.get('/tasks', getAllTasks);
app.get('/task/:id', getTaskById);
app.get('/user/:id/tasks', getTasksByUser);
app.put('/task/:id', modifyTaskById);
app.post('/task', addTask);
app.delete('/task/:id', deleteTask);

const dbConnect = async (): Promise<void> => {

    const uri: string = "mongodb+srv://hamzabb:taskproject1234@taskproject.bklz8x2.mongodb.net/TaskProject?retryWrites=true&w=majority";
    try {
        const connection = await connect(uri);
        console.log('Connected to Database');
    } catch (error) {
        console.log(error);
    }

}

//Start server
app.listen(port, async () => {
    
    //Connection to DB
    await dbConnect();
    
    console.log('Server listening on port ', port);
    
});