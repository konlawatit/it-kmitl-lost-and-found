import axios from 'axios';

const url = 'http://localhost:3000/apis/mockup';

class MockupService {
    static getTest() {
        try {
            return axios.get(`${url}/test`).then((result) => {
                console.log(result.data)
                return result.data
            })
        } catch (err) {
            return err
        }
    }
}

export default MockupService;