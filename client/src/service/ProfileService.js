import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8888"
const url = `${SERVER_URL}/apis/profile`;

class AuthService {

    static async updateProfile(payload) {
        try {

            let res = await axios.put(`${url}/update/${payload.email}`, payload.fd)
            console.log('regois',res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default AuthService;