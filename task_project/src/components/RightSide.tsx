import '../assets/css/RightSide.css';
import { useState, useEffect } from 'react';

import Task from '../types/Task';
import { getUserTasks, getAllTasks, modifyTaskById, deleteTask } from '../services/task.service';
import SeparationLine from './SeparationLine';
import { Modal } from './Modal';

function RightSide(props: any) {    

    const [ show, setShow ] = useState(false);
    const [ tasks, setTask ] = useState<Task[]>([]);
    var date = new Date().toISOString().split('T')[0];
    const [ newTask, setNewTask ] = useState({
        'title': '',
        'description': '',
        'creationDate': '',
        'endDate': date,
        'category': 'etudes',
        'isDone': false,
        'user': ''
    });

    const userId = props.userId;

    useEffect(() => {
        setNewTask({
            ...newTask,
            creationDate: date,
            user: userId
        });
    }, [userId, date]);

    // Update the list of users with the new user
    const addStateTask = (task: any) => {
        setTask([...tasks, task]);
    };

    // Get all task of user with id
    const getUsersTasks = async (userId: any) => {

        // Call function to get all user tasks
        const tasks: Task[] = await getUserTasks(userId);

        // Save the tasks on array
        setTask(tasks);

    }

    // Get all the tasks
    const getTasks = async () => {

        // Call function to get all user tasks
        const tasks = await getAllTasks();

        // Save the tasks on array
        setTask(tasks);

    }

    // Prevent loops: I had an loop problem, and i solved it with this (UseEffect not worked for this)
    if (props.clicked) {
        // IF user id equals 0, get all tasks
        if(userId === "0"){
            getTasks();
        }
        
        //ELSE only get the user task
        else {
            getUsersTasks(userId);
        }
        props.setClicked(false);
    }

    // Delete task of user by id
    const deleteUserTask = async (id: string) => {

        await deleteTask(id);

        if(userId === "0"){
            getTasks();
        }else {
            getUsersTasks(userId);
        }

    }

    // Update task sate data with the added task
    const saveData = (event: any) => {

        setNewTask({
            ...newTask,
            [event.target.name] : event.target.value
        });

    }

    // Call API to change task status on check and uncheck
    const onClickDone = async (id: string, isDone: boolean) => {
        try {

            // Call the modifyTaskById function to update task's isDone value
            await modifyTaskById(id, isDone); 

        } catch (error) {

            console.log(error);

        }
    };

    // IF not choosen user
    if(userId === "") {
        return(
            <div className="RightSide">

                <div className='TasksList'>

                    <h3>LISTE DES TÂCHES</h3>

                    <h3 className="WarningMessage">VEILLEZ CHOISIR UN UTILISATEUR POUR AFFICHER LES TÂCHES</h3>
                </div>

            </div>
        );
    }

    // IF user havem't tasks
    if (tasks.length <= 0) {
        return(
            <div className="RightSide">

                <div className='TasksList'>

                    <h3>LISTE DES TÂCHES DE { props.userName.toUpperCase() }</h3>

                    <div className='TaskActions'>

                        {/* --- Button open modal to add task --- */}
                        <button id='ButtonAddTask' onClick={ () => { setShow(true); setNewTask({...newTask,"category" : "etudes"}); } }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>

                        {/* --- Modal add new tasks --- */}
                        <Modal title="AJOUTER UNE TÂCHE" id="" newTask={ newTask } addStateTask={ addStateTask } email="" name="" onClose={ () => setShow(false) } show={ show } >
                            <input name="title" type="text" placeholder='Titre' onChange={ saveData } required/>
                            <textarea name="description" placeholder='Description' onChange={ saveData }></textarea>
                            <select name="category" id="" onChange={ saveData }>
                                <option value="etudes">Etudes</option>
                                <option value="maison">Maison</option>
                                <option value="travail">Travail</option>
                                <option value="loisirs">Loisirs</option>
                            </select>
                            <input name="endDate" type="date" defaultValue={ new Date().toISOString().slice(0, 10)} onChange={ saveData } />
                        </Modal>

                    </div>

                    <h3 className="WarningMessage">PAS DE TÂCHES DISPONIBLES POUR <strong>{ props.userName.toUpperCase() }</strong></h3>
                </div>

            </div>
        );
    }
    
    // Display the tasks
    return (
        <div className="RightSide">

            <div className='TasksList'>

                {userId != "0" ?
                    <h3>LISTE DES TÂCHES DE { props.userName.toUpperCase() }</h3> 
                : 
                   <h3>LISTE DE TOUTES LES TÂCHES</h3>
                }
                
                <div className='TaskActions'>

                    {userId != "0" ?
                        <button id='ButtonAddTask' onClick={ () => { setShow(true); setNewTask({...newTask,"category" : "etudes"}); } }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>
                    : null }

                    {/* --- Modal add new --- */}
                    <Modal title="AJOUTER UNE TÂCHE" newTask={ newTask } addStateTask={ addStateTask }  setTask={ setTask } id="" email="" name="" onClose={ () => setShow(false) } show={ show } >
                        <input name="title" type="text" placeholder='Titre' onChange={ saveData } required/>
                        <textarea name="description" placeholder='Description' onChange={ saveData }></textarea>
                        <select name="category" id="" onChange={ saveData }>
                            <option value="etudes">Etudes</option>
                            <option value="maison">Maison</option>
                            <option value="travail">Travail</option>
                            <option value="loisirs">Loisirs</option>
                        </select>
                        <input name="endDate" type="date" defaultValue={ date } onChange={ saveData } />
                    </Modal>

                </div>
                
                {/* --------- Container with task information and actions --------- */}
                {tasks.length > 0 ?
                    tasks.map( (task, index) => {
                        return(
                            
                            <div key={ index } className='TaskContainer'>

                                {userId !== "0" ? null : 
                                    task && task.user && task.user.name ? (
                                        <div id="TaskUserName">
                                        <p>{task.user.name.toUpperCase()}</p>
                                        </div>
                                    ) : null
                                }

                                <div className='TaskInformation'>
                                    
                                    <div className='LeftBlockTask'>
                                        <h4 className='CategoryTask'>{ task.category.toUpperCase() }</h4>
                                        <div className='TaskDescription'>
                                            <h4>{ task.title }</h4>
                                            <p>{ task.description }</p>
                                        </div>
                                    </div>
                                    
                                    <div className='RightBlockTask'>

                                        <div className='DateTaskBox'>

                                            <div className='DateTaskInfo'>
                                                <img src="./icons/created_icon.png" alt="Created at " />
                                                <p>{ (new Date(task.creationDate)).toLocaleDateString('en-GB') }</p>
                                            </div>

                                            <div className='DateTaskInfo'>
                                                <img src="./icons/end_icon.png" alt="End " />
                                                <p>{ (new Date(task.endDate)).toLocaleDateString('en-GB') }</p>
                                            </div>

                                        </div>

                                        <div className='ActionTaskButtons'>
                                            <button onClick={ () => { deleteUserTask(task._id) } }><img src="./icons/delete_icon.png" alt="" /></button>
                                        </div>

                                    </div>
                                
                                </div>

                                <div className='TaskStatus'>
                                    <input name="isDone" type="checkbox" defaultChecked={ task.isDone } onClick={ () => { onClickDone(task._id, !task.isDone) } }/>
                                </div>
                                
                            </div>
                        )
                    })
                : null }

                <SeparationLine/>

            </div>

        </div>
    );
}

export default RightSide;
