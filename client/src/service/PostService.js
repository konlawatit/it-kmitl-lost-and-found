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

    static getonePosts(payload){
        const id = payload
        try{
            return axios.get(`${url}/oneposts/${id}`,).then((result) => {
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

    static getPostsLost(){
        try{
            return axios.get(`${url}/lostpost`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static getPostsFound(){
        try{
            return axios.get(`${url}/foundpost`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static getmyPostsLost(payload){
        const id = payload
        try{
            return axios.get(`${url}/mylostpost/${id}`).then((result) =>{
                return result.data
            })
        } catch(err){
            console.log(err)
            return err
        }
    }

    static getmyPostsFound(payload){
        const id = payload
        try{
            return axios.get(`${url}/myfoundpost/${id}`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static editPost(payload){
        try{
            return axios.post(`${url}/editpost`, {id: payload.id, topic:payload.topic, place: payload.place, post_desc: payload.post_desc,
            type: payload.type}).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static deletePost(payload){
        const id = payload
        try{
            return axios.delete(`${url}/deletepost/${id}`,).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }
}

export default PostService;