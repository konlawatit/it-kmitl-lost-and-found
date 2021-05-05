import axios from 'axios';

const url = 'http://localhost:8888/apis/comment';

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
            return axios.post(`${url}/${payload.post_id}/editcomment`, {comment_no: payload.comment_no, comment_desc: payload.comment_desc}).then((result) =>{
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