import '../assets/css/RightSide.css';
import SeparationLine from './SeparationLine';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';
import { getUserTasks, getAllTasks, deleteTask } from '../services/task.service';
import Task from '../types/Task';

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

        {/** Call function to get all user tasks */}
        const tasks: Task[] = await getUserTasks(userId);

        {/** Save the tasks on array */}
        setTask(tasks);

    }

    const getTasks = async () => {

        {/** Call function to get all user tasks */}
        const tasks = await getAllTasks();

        {/** Save the tasks on array */}
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
        getUsersTasks(userId);

    }

    const saveData = (event: any) => {

        setNewTask({
            ...newTask,
            [event.target.name] : event.target.value
        });

    }

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

                    <h3>LISTE DES TÂCHES DE { props.userName }</h3>

                    <div className='TaskActions'>

                        {/* --- Select filtering tasks --- */}
                        <select name="FilterTasks" id="FilterTasks" disabled>

                            <option value="etudes">Etudes</option>
                            <option value="maison">Maison</option>
                            <option value="travail">Travail</option>
                            <option value="loisirs">Loisirs</option>

                        </select>

                        {/* --- Select ordering tasks --- */}
                        <select name="OrderByTasks" id="OrderByTasks" disabled>
                            <option value="">Filtrer par</option>
                            <option value="alphabetique">Orde alphabétique</option>
                            <option value="dateFin">Date d'écheance</option>
                        </select>

                        {/* --- Button open modal to add task --- */}
                        <button id='ButtonAddTask' onClick={ () => setShow(true) }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>

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
                            <input name="endDate" type="date" onChange={ saveData } />
                        </Modal>
                        {/* ---------- END Modal ---------- */}

                    </div>

                    <h3 className="WarningMessage">PAS DE TÂCHES DISPONIBLES POUR <strong>{ props.userName }</strong></h3>
                </div>

            </div>
        );
    }
    
    return (
        <div className="RightSide">

            <div className='TasksList'>

                <h3>LISTE DES TÂCHES DE { props.userName }</h3>

                {/* --- SECTION 1 : Selectors and button for filters, order by and add task --- */}
                <div className='TaskActions'>

                    {/* --- Select filtering tasks --- */}
                    <select name="FilterTasks" id="FilterTasks">

                        <option value="">Tout</option>
                        <option value="etudes">Etudes</option>
                        <option value="maison">Maison</option>
                        <option value="travail">Travail</option>
                        <option value="loisirs">Loisirs</option>

                    </select>

                    {/* --- Select ordering tasks --- */}
                    <select name="OrderByTasks" id="OrderByTasks">
                        <option value="">Filtrer par</option>
                        <option value="alphabetique">Orde alphabétique</option>
                        <option value="dateFin">Date d'écheance</option>
                    </select>

                    {userId != "0" ?

                    <button id='ButtonAddTask' onClick={ () => setShow(true) }><img src="./icons/more_icon.png" /> Nouvelle tâche</button>

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

                                <img src="./icons/move_icon.png" alt="Move" />

                                <div className='TaskInformation'>

                                    <div className='LeftBlockTask'>
                                        <h4 className='CategoryTask'>{ task.category }</h4>
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
                                    <input name="isDone" type="checkbox" checked={ task.isDone } onClick={ saveData }/>
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
