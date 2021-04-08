import axios from 'axios';

const url = 'http://localhost:8888/apis/post';

class PostService {
    static getAllPosts() {
        try {
            return axios.get(`${url}/allposts`).then((result) => {
                return result.data
            })
        } catch (err) {
            return err
        }
    }
    static createPost() {
        try {
            return axios.post(`${url}/createpost`).then((result) =>{
                return result.data
            })
        } catch (err) {
            return err
        }
    }
}

export default PostService;