import api from "./api";
import auth from './auth';

class UserService {
    register(data) {
        return api.post('/users/signup', data);
    }
    logIn(data) {
        return api.post('/users/login', data);
    }
    getAllUsers() {
        return api.get('/users', { headers: auth() });
    }
    getUserById(id) {
        return api.get( '/users/' + id, { headers: auth() })
    }
    updateProfilePicture(id, data) {
        return api.patch( '/users/' + id + '/picture/update', data, { headers: auth() })
    }
   removeProfilePicture(id, data) {
        return api.patch( '/users/' + id + '/picture/delete', data, { headers: auth() })
    }
    updateProfileBio(id, data) {
        return api.patch( '/users/' + id + '/bio/update', data, { headers: auth() })
    }
    deleteAccount(id) {
        return api.delete('/users/' + id, { headers: auth(), data: { userId: id } });
    }
}
export default new UserService();
