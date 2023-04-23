import '../assets/css/Modal.css';

import { addUser } from '../services/user.service';
import { addTask } from '../services/task.service';

const Modal = (props: any) => {

    if(!props.show) {
        return null
    }

    // On form submit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        // prevent the refresh
        event.preventDefault();

        // IF newUser exist -> add user
        if (props.newUser){

            // Add new user with function API call and change the state for updating our web data dynamically
            try{
                const addedUser = await addUser(props.newUser);
                
                props.addStateUser(addedUser);

                props.onClose()
            }catch(error) {
                console.log(error);
            }

        }
        // ELSE IF newTask exist -> add task 
        else if (props.newTask) {

            // Add new task with function API call and change the state for updating our web data dynamically
            try{
                const addedTask = await addTask(props.newTask);

                props.addStateTask(addedTask);

                props.onClose()
            }catch(error){
                console.log(error);
            }            

        }

    };

    return (
        <div className="Modal" onClick={ props.onClose }>

            <div className="ModalContent" onClick={ e => e.stopPropagation() }>
                
                <form onSubmit={ onSubmit }>

                    <div className="ModalHeader">
                        <h4>{ props.title }</h4>
                    </div>

                    <div className="ModalBody">
                        { props.children }
                    </div>

                    <div className="ModalFooter">
                        <button type="submit" className='ButtonSave'>Enregistrer</button>
                        <button type="button" className='ButtonClose' onClick={ props.onClose }>Fermer</button>
                    </div>

                </form>
                
            </div>

        </div>
    )
}

export { Modal };