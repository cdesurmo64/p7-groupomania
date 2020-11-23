import axios from 'axios';
import auth from './auth';

const url = window.location.protocol + '//' + window.location.hostname + ':3000/api/user/';

class UserService {
    register(data) {
        return axios.post(url + 'signup', data);
    }
    logIn(data) {
        return axios.post(url + 'login', data);
    }
    getUserById(id) {
        return axios.get( url + id, { headers: auth() })
    }
}

export default new UserService();


