import axios from 'axios';

const SERVER_URL = process.env.SERVER_URL || "http://localhost:8888"
const url = `${SERVER_URL}/apis/comment`;

class CommentService {
    static async createComment(payload, postId) {
        try {
            let res =await axios.post(`${url}/${postId}`, payload)
            return res.data
        } catch (err) {
            return err
        }
    }
    static async getComments(postId) {
        try {
            let res = await axios.get(`${url}/${postId}`)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async editComment(payload){
        try{
            return axios.post(`${url}/${payload.post_id}/editcomment`, payload).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }

    static async deleteComment(idcom){
        try{
            return axios.delete(`${url}/deletecomment/${idcom}`).then((result) =>{
                return result.data
            })
        } catch(err){
            return err
        }
    }
}

export default CommentService;