import '../assets/css/Modal.css';
import { addUser } from '../services/user.service';
import { addTask } from '../services/task.service';

const Modal = (props: any) => {

    if(!props.show) {
        return null
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        // IF id exist -> modify an user
        if (props.id != "") {

            alert(props.id);

        }
        // ELSE IF name exist -> add user
        else if (props.newUser){

            try{
                const addedUser = await addUser(props.newUser);
                
                props.addStateUser(addedUser);

                props.onClose()
            }catch(error) {
                console.log(error);
            }

        }
        // ELSE IF title exist -> add task 
        else if (props.newTask) {

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