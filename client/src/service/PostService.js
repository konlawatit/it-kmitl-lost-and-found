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
    static getMyPosts(payload){
        const id = payload
        try{
            return axios.get(`${url}/allmyposts/${id}`,).then((result) => {
                return result.data
            })
        } catch (err){
            return err
        }
    }
    static createPost(payload) {
        try {
            return axios.post(`${url}/createpost`, {userid:payload.userid, topic:payload.topic, categoryPost:payload.categoryPost, postDesc:payload.postDesc, post_time:payload.post_time, place:payload.place}).then((result) =>{
                return result.data
            })
        } catch (err) {
            return err
        }
    }
    static countuser(){
        try{
            return axios.get(`${url}/countuser`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static countpost(){
        try{
            return axios.get(`${url}/countpost`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }
}

export default PostService;