import axios from 'axios';

const url = 'http://localhost:8888/apis/chat';

class ChatService {
    static async getMessages(payload) {
        try {
            console.log(payload.user_id)
            let res =await axios.get(`${url}/messages`, {params:{user_id: payload.user_id, another_id: payload.another_id}})
            // let res =await axios.get(`${url}/messages`, {
            //     params: {
            //       ID: 12345
            //     }
            //   })
            
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default ChatService;