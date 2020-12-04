import api from "./api";
import auth from './auth';

class UserService {
    register(data) {
        return api.post('/user/signup', data);
    }
    logIn(data) {
        return api.post('/user/login', data);
    }
    getUserById(id) {
        return api.get( '/user/' + id, { headers: auth() })
    }
    updateProfilePicture(id, data) {
        return api.patch( '/user/' + id + '/update/picture', data, { headers: auth() })
    }
    updateProfileBio(id, data) {
        return api.patch( '/user/' + id + '/update/bio', data, { headers: auth() })
    }
    deleteAccount(id) {
        return api.delete('/user/' + id, { headers: auth(), data: { userId: id } });
    }
}
export default new UserService();
