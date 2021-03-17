import axios from 'axios';

const url = 'http://localhost:8888/apis/auth';

class AuthService {
    static login(payload) {
        try {
            return axios.post(`${url}/login`, {"idtoken": payload}).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }
}

export default AuthService;