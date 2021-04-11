import axios from 'axios';

const url = 'http://localhost:8888/apis/comment';

class CommentService {
    static async createComment(payload) {
        try {
            let res =await axios.post(`${url}/${payload.postId}`, {comment: payload.commentText, user_id: payload.user_id})
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
}

export default CommentService;