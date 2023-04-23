import { Request, Response } from "express";
import { Task, ITask } from "../models/Task";

//Create new task
const addTask = async (request: Request, response: Response): Promise<void> => {
    
    const task = new Task(request.body);
    try {
        await task.save();
        response.json(task);
    } catch (error) {
        response.status(500).json({error : error});
    }
    
}

//Get all tasks
const getAllTasks = async (request: Request, response: Response): Promise<void> => {

    try {
        const task : ITask[] = await Task.find().populate('user');
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (error) {
        response.status(500).json({error : error});
    }

}

//Get task by id
const getTaskById = async (request: Request, response: Response): Promise<void> => {

    const id = request.params.id;
    try {
        const task = await Task.findById(id);
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    } catch (error) {
        response.status(500).json({error : error});
    }

}

//Modify "isDone" boolean column task by id
const modifyTaskById = async (request: Request, response: Response): Promise<void> => {

    const id = request.params.id;
    const isDone = request.body.isDone;

    try {
        const task = await Task.findById(id);
        if (task) {
            task.isDone = isDone;
            await task.save();
            response.json(task);
        } else {
            response.status(404).send({error: {
                code: 404,
                message: "Not found"
            }});
        }
    } catch (error) {
        response.status(500).json({error: error});
    }

}

//Delete task by id
const deleteTask = async (request: Request, response: Response): Promise<void> => {

    const id = request.params.id;
    try {
        const task = await Task.findById(id);
        task?.deleteOne({id});
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    }catch (error) {
        response.status(500).json({error : error});
    }

}

//Get all tasks by users
const getTasksByUser = async (request: Request, response: Response): Promise<void> => {

    const id = request.params.id;

    try {
        const task : ITask[] = await Task.find({"user": id});
        task ? response.json(task) : response.status(404).send({error : {
            code : 404,
            message : "Not found"
        }});
    }catch(error) {
        response.status(500).json({error : error});
    }

}

export { addTask, getAllTasks, getTaskById, modifyTaskById, deleteTask, getTasksByUser };