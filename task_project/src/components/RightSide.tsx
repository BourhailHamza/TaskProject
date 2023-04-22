import '../assets/css/RightSide.css';
import SeparationLine from './SeparationLine';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';
import { getUserTasks, getAllTasks, modifyTaskById, deleteTask } from '../services/task.service';
import Task from '../types/Task';
import User from '../types/User';

function RightSide(props: any) {    

    const [ show, setShow ] = useState(false);
    const [ isDone, setIsDone ] = useState(false);
    const [ tasks, setTask ] = useState<Task[]>([]);
    const [ newTask, setNewTask ] = useState({
        'title': '',
        'description': '',
        'creationDate': '',
        'endDate': '',
        'category': 'etudes',
        'isDone': false,
        'user': ''
    });
    const userId = props.userId;

    var date = new Date().toISOString().split('T')[0];

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

    const getUsersTasks = async (userId: any) => {

        // Call function to get all user tasks
        const tasks: Task[] = await getUserTasks(userId);

        // Save the tasks on array
        setTask(tasks);

    }

    const getTasks = async () => {

        // Call function to get all user tasks
        const tasks = await getAllTasks();

        // Save the tasks on array
        setTask(tasks);

    }

    if (props.clicked) {
        if(userId === "0"){
            getTasks();
        }else {
            getUsersTasks(userId);
        }
        props.setClicked(false);
    }

    const deleteUserTask = async (id: string) => {

        await deleteTask(id);

        if(userId === "0"){
            getTasks();
        }else {
            getUsersTasks(userId);
        }

    }

    const saveData = (event: any) => {

        setNewTask({
            ...newTask,
            [event.target.name] : event.target.value
        });

    }

    const onClickDone = async (id: string, isDone: boolean) => {
        try {
          await modifyTaskById(id, isDone); // Call the modifyTaskById function to update task's isDone value
          // Handle success or display a success message
        } catch (error) {
          // Handle error or display an error message
        }
      };

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

    if (tasks.length <= 0) {
        return(
            <div className="RightSide">

                <div className='TasksList'>

                    <h3>LISTE DES TÂCHES DE { props.userName.toUpperCase() }</h3>

                    <div className='TaskActions'>

                        {/* --- Button open modal to add task --- */}
                        <button id='ButtonAddTask' onClick={ () => { setShow(true); setNewTask({...newTask,"category" : "etudes"}); } }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>

                        {/* --- Modal with form elements --- */}
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
                        {/* ---------- END Modal ---------- */}

                    </div>

                    <h3 className="WarningMessage">PAS DE TÂCHES DISPONIBLES POUR <strong>{ props.userName.toUpperCase() }</strong></h3>
                </div>

            </div>
        );
    }
    
    return (
        <div className="RightSide">

            <div className='TasksList'>

                {userId != "0" ?
                    <h3>LISTE DES TÂCHES DE { props.userName.toUpperCase() }</h3> 
                : 
                   <h3>LISTE DE TOUTES LES TÂCHES</h3>
                }
                
                {/* --- SECTION 1 : Selectors and button for filters, order by and add task --- */}
                <div className='TaskActions'>

                    {userId != "0" ?
                        <button id='ButtonAddTask' onClick={ () => { setShow(true); setNewTask({...newTask,"category" : "etudes"}); } }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>
                    : null }

                    {/* --- Modal with form elements --- */}
                    <Modal title="AJOUTER UNE TÂCHE" newTask={ newTask } addStateTask={ addStateTask }  setTask={ setTask } id="" email="" name="" onClose={ () => setShow(false) } show={ show } >
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
                    {/* ---------- END Modal ---------- */}

                </div>
                {/* ------------------------------ END SECTION 1 ------------------------------ */}
                {/* --------------------------------------------------------------------------- */}
                {/* --------- SECTION 2 : Container with task information and actions --------- */}
                {tasks.length > 0 ?
                    tasks.map( (task, index) => {
                        return(
                            
                            <div key={ index } className='TaskContainer'>

                                <div className='TaskInformation'>

                                    <p>{ task.user.name }</p>

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
                {/* ------------------------------ END SECTION 2 ------------------------------ */}

                <SeparationLine/>

            </div>

        </div>
    );
}

export default RightSide;
