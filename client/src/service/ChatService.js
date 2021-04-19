import axios from 'axios';

const url = 'http://localhost:8888/apis/chat';

class ChatService {
    static async getMessages(payload) {
        try {
            console.log(payload.user_id)
            let res = await axios.get(`${url}/messages`, {
                params: {
                    user_id: payload.user_id,
                    another_id: payload.another_id
                }
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async sendMessages(payload) {
        try {
            console.log(payload.user_id)
            let res = await axios.post(`${url}/message`, {
                message: payload.message,
                user_id: payload.user_id,
                another_id: payload.another_id
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getRooms(user_id) {
        try {
            let res = await axios.get(`${url}/allconversations`, {
                params: {
                    user_id: user_id
                }
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async createConversation(user_id, another_id) {
        try {
            let res = await axios.post(`${url}/conversation`, {
                user_id: user_id,
                another_id: another_id
            })
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default ChatService;