import axios from 'axios';

getUsers = () => {
    return axios.get('https://randomuser.me/api/?results=100')
}

export default getUsers();