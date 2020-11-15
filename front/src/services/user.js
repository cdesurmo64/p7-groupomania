import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + ':3000/api/auth/';

class UserService {
    register(data) {
        return axios.post(url + 'signup', data);
    }
    logIn(data) {
        return axios.post(url + 'login', data);
    }

}

export default new UserService();


