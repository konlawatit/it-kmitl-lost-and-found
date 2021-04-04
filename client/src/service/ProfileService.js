import axios from 'axios';

const url = 'http://localhost:8888/apis/profile';

class AuthService {

    static async updateProfile(payload) {
        try {

            let res = await axios.put(`${url}/update/${payload.user_id}`, payload.fd)
            console.log('regois',res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default AuthService;