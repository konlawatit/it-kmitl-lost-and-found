const pool = require('../database/mysql')
//const db = require('../database/mysql')

class QuerySql {
    // constructor(sql, payload) {
    //     this.sql = sql;
    //     this.payload = sql;
    // }
    async test() {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let name = await conn.query('UPDATE USER SET user_name = ?  WHERE `user_id` = 62070007;', ['กลวัชร หัสไทรทอง'])
            console.log(name)
            conn.commit();
            return name
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally test')
            conn.release();
        }
    }

    async exists(table, column, target) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            let sql = `SELECT EXISTS(SELECT ${column} FROM ${table} WHERE ${column} = ${target})`
            let isExists = await conn.query(sql)
            conn.commit();
            return {
                'exists': isExists[0][0][sql.slice(7)]
            }
        } catch (err) {
            await conn.rollback();
            console.log(`rolback exists`)
            throw new Error(err)
        } finally {
            console.log('finally exists')
            conn.release();
        }
    }

    async createUser(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            console.log('payload2', payload)
            let sql = "INSERT INTO USER (user_id, user_name, firstname, lastname, email, picture, birthday, phone_number, `type`, merit, `role`) VALUES ?"
            let result = await conn.query(sql, [payload])
            //let result = await conn.query(`INSERT INTO USER (user_id) VALUES (${payload[0]})`)
            //console.log(result)
            conn.commit();
            return {
                result
            }
        } catch (err) {
            await conn.rollback();
            console.log(`create user rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create user')
            conn.release();
        }
    }

    async updateProfile(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            let result = await conn.query(sql, payload)
            conn.commit();
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`update profile rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally update user')
            conn.release();
        }
    }

    async getUser(user) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            console.log('user ', user)
            let sql = `SELECT *, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM USER WHERE user_id = ${user};`
            let result = await conn.query(sql)
            let user_info = result[0][0]
            console.log('user info', user_info)
            conn.commit();
            return {
                "sub": user_info.user_id,
                "name": user_info.user_name,
                "sub": user_info.user_id,
                "email": user_info.email,
                "given_name": user_info.firstname,
                "family_name": user_info.lastname,
                "picture": 'http://localhost:8888/' + user_info.picture,
                'type': user_info.type,
                'role': user_info.role,
                'phone_number': user_info.phone_number,
                'merit': user_info.merit,
                'birthday': user_info.birthday
            }
        } catch (err) {
            await conn.rollback();
            console.log(`rolback get user`, err)
            throw new Error(err)
        } finally {
            console.log('finally get user')
            conn.release();
        }
    }

    async allPosts() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            //"SELECT *FROM (SELECT * FROM INFO_COMMENT INNER JOIN USER ON INFO_COMMENT.INFO_POST_post_id="+postId+") AS `INFO_COMMENT_USER` WHERE user_id = USER_user_id ORDER BY comment_time"
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id order by INFO_POST.post_time desc`
            let posts = await conn.query(sql)
            await posts[0].map(data => {
                //data['post_picture'] = 'http://localhost:8888/' + data['post_picture'] เปิดใช้ตอนที่แก้ให้อัพโหลดไฟล์ตอนโพสลงเครื่อง
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            //console.log(posts)
            conn.commit();
            return posts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all post')
            conn.release();
        }
    }

    async countUser() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT count(user_id) as countuser FROM USER`
            let result = await conn.query(sql)
            console.log(result)
            conn.commit();
            return result[0][0].countuser
        } catch (err) {
            console.log(err)
            await conn.rollback();
            console.log(`rolback11`)
        } finally {
            console.log('finally count user')
            conn.release();
        }
    }

    async countPost() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT count(post_id) as countuser FROM INFO_POST`
            let result = await conn.query(sql)
            console.log(result)
            conn.commit();
            return result[0][0].countuser
        } catch (err) {
            console.log(err)
            await conn.rollback();
            console.log(`rolback11`)
        } finally {
            console.log('finally count user')
            conn.release();
        }
    }

    async myPosts(id){
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try{
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id wHERE USER.user_id = ? order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch(err){
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async myLostPosts(id){
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try{
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id wHERE USER.user_id = ? and INFO_POST.category_post = 'lost' order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch(err){
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async myFoundPosts(id){
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try{
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id wHERE USER.user_id = ? and INFO_POST.category_post = 'found' order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch(err){
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async lostPosts() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id WHERE INFO_POST.category_post = 'lost' order by INFO_POST.post_time desc`
            let posts = await conn.query(sql)
            await posts[0].map(data => {
                //data['post_picture'] = 'http://localhost:8888/' + data['post_picture'] เปิดใช้ตอนที่แก้ให้อัพโหลดไฟล์ตอนโพสลงเครื่อง
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            //console.log(posts)
            conn.commit();
            return posts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all post')
            conn.release();
        }
    }

    async foundPosts() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id WHERE INFO_POST.category_post = 'found' order by INFO_POST.post_time desc`
            let posts = await conn.query(sql)
            await posts[0].map(data => {
                //data['post_picture'] = 'http://localhost:8888/' + data['post_picture'] เปิดใช้ตอนที่แก้ให้อัพโหลดไฟล์ตอนโพสลงเครื่อง
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            //console.log(posts)
            conn.commit();
            return posts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all post')
            conn.release();
        }
    }

    async createPost(data) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = "INSERT INTO INFO_POST (user_id, topic, category_post, post_desc, post_time, place) VALUES(?, ?, ?, ?, ?, ?)"
            let result = await conn.query(sql, [data.userid, data.topic, data.categoryPost, data.postDesc, data.post_time, data.place])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            await conn.rollback();
            console.log(`create post rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create post')
            conn.release();
        }
    }

    async createComment(payload, postId) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            console.log(payload)
            let sql = "INSERT INTO INFO_COMMENT(comment_desc, INFO_POST_post_id, USER_user_id, comment_time) VALUES(?)"
            await conn.query(sql, [payload])
            await conn.commit()
            return await this.getComments(postId)

        } catch (err) {
            await conn.rollback();
            console.log(`create comment rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create comment')
            conn.release();
        }
    }

    async getComments(postId) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            let sql = "SELECT *, DATE_FORMAT(comment_time, '%d/%m/%Y') as `comment_date`, DATE_FORMAT(comment_time, '%H:%i') as `comment_time` FROM (SELECT * FROM INFO_COMMENT INNER JOIN USER ON INFO_COMMENT.INFO_POST_post_id=" + postId + ") AS `INFO_COMMENT_USER` WHERE user_id = USER_user_id ORDER BY comment_time"
            let result = await conn.query(sql)
            conn.commit();
            result = await result[0].map(data => {
                data['picture'] = 'http://localhost:8888/' + data['picture']
                return data
            })
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`get comment rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally get comment')
            conn.release();
        }
    }

    async createConversation(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            let checkConversationExists = `SELECT EXISTS(
                 SELECT * FROM CONVERSATIONS WHERE (
                     user_id_1 = ${payload[1]} AND user_id_2 = ${payload[2]}) OR (user_id_1 = ${payload[2]} AND user_id_2 = ${payload[1]})) as 'exists'`
            //let checkConversationExists = `SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${payload[1]} AND user_id_2 = ${payload[2]}) OR (user_id_1 = ${payload[2]} AND user_id_2 = ${payload[1]})`
            let conversationExists = (await conn.query(checkConversationExists))[0][0]['exists']
            if (conversationExists > 0) {
                conn.commit();
                return false
            } else {
                let sql = `INSERT INTO CONVERSATIONS(con_id, user_id_1, user_id_2, noti_user_id_1, noti_user_id_2) VALUES(?, 0, 0);`
                let result = await conn.query(sql, [payload])
                conn.commit();
                return result
            }
            //result = msg
            //console.log(result)
        } catch (err) {
            await conn.rollback();
            console.log(`create conversation rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create conversation')
            conn.release();
        }
    }

    async getAllConversations(user_id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${user_id}) OR (user_id_2 = ${user_id})`
            let sql = `SELECT USER.user_name, USER.picture, USER.user_id, con_id, user_id_1, user_id_2, noti_user_id_2,
            CASE WHEN user_id_1 = ${user_id} THEN noti_user_id_1 
            ELSE noti_user_id_2 
            END AS notification FROM USER INNER JOIN (SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${user_id}) OR (user_id_2 = ${user_id})) AS conversations ON (user_id = user_id_2 AND user_id_2 != ${user_id}) or (user_id = user_id_1 AND user_id_1 != ${user_id})`

            let result = await conn.query(sql)

            conn.commit();
            //result = msg
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`get all conversations rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally get all conversations')
            conn.release();
        }
    }

    async getConversation(user_id, another_id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            let sql = `SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${user_id} AND user_id_2 = ${another_id}) OR (user_id_1 = ${another_id} AND user_id_2 = ${user_id})`
            //console.log(sql)
            let conversation = (await conn.query(sql))[0][0]

            conn.commit();
            //result = msg
            //console.log(result)
            console.log(conversation)
            return conversation
        } catch (err) {
            await conn.rollback();
            console.log(`get conversation rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally get conversation')
            conn.release();
        }
    }

    async getMessages(user_id, another_id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            let sql = `SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${user_id} AND user_id_2 = ${another_id}) OR (user_id_1 = ${another_id} AND user_id_2 = ${user_id})`
            console.log('1111111111111111111', sql)
            let conversation = (await conn.query(sql))[0][0]
            conn.commit();
            let result = await conn.query(`SELECT * FROM MESSAGES WHERE con_id = '${conversation.con_id}'`)

            //result = msg
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`get message rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally get message')
            conn.release();
        }
    }

    async addMessage(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            let sql = "INSERT INTO MESSAGES(content, con_id, message_by) VALUES(?)"
            conn.commit();
            let result = await conn.query(sql, [payload])
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`add message rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally add message')
            conn.release();
        }
    }

    async addNotiChat(target_id, con_id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            //let sql = "INSERT INTO MESSAGES(content, con_id, message_by) VALUES(?)"\
            let sql = `UPDATE CONVERSATIONS SET noti_user_id_1 = CASE 
            WHEN user_id_1 = ${target_id} THEN noti_user_id_1 + 1
            ELSE noti_user_id_1
            END, 
            noti_user_id_2 = CASE 
            WHEN user_id_2 = ${target_id} THEN noti_user_id_2 + 1 
            ELSE noti_user_id_2
            END 
            WHERE con_id = '${con_id}'`
            conn.commit();
            let result = await conn.query(sql)
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`add noti chat rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally add noti chat')
            conn.release();
        }
    }

    async clearNotiChat(target_id, con_id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            //let sql = "INSERT INTO MESSAGES(content, con_id, message_by) VALUES(?)"\
            let sql = `UPDATE CONVERSATIONS SET noti_user_id_1 = CASE 
            WHEN user_id_1 = ${target_id} THEN 0
            ELSE noti_user_id_1
            END, 
            noti_user_id_2 = CASE 
            WHEN user_id_2 = ${target_id} THEN 0
            ELSE noti_user_id_2
            END 
            WHERE con_id = '${con_id}'`
            conn.commit();
            let result = await conn.query(sql)
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`add noti chat rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally add noti chat')
            conn.release();
        }
    }

}

module.exports = QuerySql