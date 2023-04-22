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

//Modify status of the task
const modifyTaskById = async (id: string, isDone: boolean) => {
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone }), // Convert isDone value to JSON string
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:8080/task/${id}`, request);
      const updatedTask = await response.json();
      // Handle success response, if needed
      console.log(updatedTask); // You can log or process the updated task data as needed
    } catch (error) {
      // Handle error response, if needed
      console.error(error);
    }
  };

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

export { addTask, getUserTasks, getAllTasks, modifyTaskById, deleteTask }