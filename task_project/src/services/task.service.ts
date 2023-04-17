import Task from '../types/Task';

//POST request to add task
const addTask = async (task: any) => {

    const request = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)

    };

    try {

        const response =  await fetch('http://127.0.0.1:8080/task', request);
        const newTask = await response.json();
        return newTask;
        
    }catch(error) {

        console.log(error)

    }
   
}

//GET request to get all tasks by user
const getUserTasks = async (id: string) => {
   
    try {

        const response = await fetch('http://127.0.0.1:8080/user/'+id+'/tasks');
        const tasks = await response.json();

        return tasks;

    }catch (error) {

        console.log(error)

    } 

}

const getAllTasks = async () => {
   
    try {

        const response = await fetch('http://127.0.0.1:8080/tasks');
        const tasks = await response.json();

        return tasks;

    }catch (error) {

        console.log(error)

    } 

}

//DELETE request to delete task
const deleteTask = async (id: string) => {

    const request = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }

    try {

        const response =  await fetch('http://127.0.0.1:8080/task/' + id, request);
        const newUser = await response.json();
        return newUser;

    }catch(error) {

        console.log(error)

    }

}

export { addTask, getUserTasks, getAllTasks, deleteTask }