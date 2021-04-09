import axios from 'axios';

const url = 'http://localhost:8888/apis/comment';

class CommentService {
    static async createComment(payload) {
        try {
            let res =await axios.post(`${url}/${payload.postId}`, {comment: payload.commentText, user_id: payload.user_id})
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default CommentService;