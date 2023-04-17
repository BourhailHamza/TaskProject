import User from '../types/User';

const getAllUsers = async () => {
   
    try {

        const response = await fetch('http://127.0.0.1:8080/users');
        const users = await response.json();

        return users;

    }catch (error) {

        console.log(error)

    } 

}

const getUserById = async (id : number) => {

    const request = {

        method: 'GET',
        headers: { 'Content-Type': 'application/json',  'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(id)

    };

    try {

        const response = await fetch('http://127.0.0.1:8080/user', request);
        const user = await response.json();

        return user;

    }catch (error) {

        console.log(error)

    } 

}

const addUser = async (user: any) => {

    const request = {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)

    };

    try {

        const response =  await fetch('http://127.0.0.1:8080/user', request);
        const newUser = await response.json();
        return newUser;
        

    }catch(error) {

        console.log(error)

    }
   
}

const deleteUserById = async (id : string) => {

    const request = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    }

    try {

        const response =  await fetch('http://127.0.0.1:8080/user/' + id, request);
        const newUser = await response.json();
        return newUser;

    }catch(error) {

        console.log(error)

    }

}

export {getAllUsers, getUserById, addUser, deleteUserById}