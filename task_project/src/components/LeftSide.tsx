import '../assets/css/LeftSide.css';
import SeparationLine from './SeparationLine';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';
import User from '../types/User';
import { getAllUsers, deleteUserById } from '../services/user.service';

const LeftSide = (props: any) => {

  const [ show, setShow ] = useState(false)
  const [ users, setUsers ] = useState<User[]>([]);
  const [ newUser, setNewUser ] = useState({});

  useEffect(() => {
    getUsersData();
  }, []);

  // Update the list of users with the new user
  const addStateUser = (user: any) => {
    setUsers([...users, user]);
  };

  const getUsersData = async () => {

    {/** Call function to get all users */}
    const users: User[] = await getAllUsers();

    {/** Save the user on array */}
    setUsers(users);

  }

  const deleteUser = async (id: string) => {

    await deleteUserById(id);
    getUsersData();

  }

  const saveData = (event: any) => {

      setNewUser({
        ...newUser,
        [event.target.name]: event.target.value
      });
    
  }

  const choseUser = (id: string, userName: any) => {
    console.log(id);
    props.setUserId(id);
    props.setClicked(true);
    props.setUserName(userName);
  }

  return (
    <div className="LeftSide">

      <h3>LISTE D'UTILISATEURS</h3>

      <SeparationLine/>

      <div className='UserList'>
        <div className='user_box' onClick={ () => { choseUser("0", "none") }}> 
          <p className='user_name'>Afficher toutes les tâches</p>
        </div>
        {/** Loop on array printing all user informations */}
        {users.length > 0 ?
          users.map( (user, index) => {
            return (
              <div className='user_box' key={ index } onClick={ () => { choseUser(user._id, user.name) } }> 
                <img src="./icons/user_icon.png" alt="User" />
                <div className='user_information'>
                    <p className='user_name'>{ user.name }</p>
                    <p>{ user.email }</p>
                </div>
                <div className='ActionBox'>
                    <button className="ActionButton" onClick={ () => deleteUser(user._id) }>
                      <img src="./icons/delete_icon.png" alt="Delete" />
                    </button>
                </div>
              </div>
            )
          })
        :null}

      </div>

      {/** Button open modals to add user */}
      <button className='ButtonAddUser' onClick={ () => setShow(true) }><img src='./icons/more_icon.png' /> Nouveau utilisateur</button>

      {/** Modal with new user form */}
      <Modal key="addUser" title="AJOUTER UN UTILISATEUR" id="" addStateUser={ addStateUser } newUser={ newUser } onClose={ () => setShow(false) } show={ show } >
          <input name="name" type="text" placeholder="Nom de l'utilisateur" onChange={ saveData } required />
          <input name="email" type="email" placeholder='E-mail' onChange={ saveData } />
      </Modal> 

    </div>
  );
}

export default LeftSide;
