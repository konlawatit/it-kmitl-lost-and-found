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
            console.log('user info',user_info)
            conn.commit();
            return {
                "sub": user_info.user_id,
                "name": user_info.user_name,
                "sub": user_info.user_id,
                "email": user_info.email,
                "given_name": user_info.firstname,
                "family_name": user_info.lastname,
                "picture": 'http://localhost:8888/'+user_info.picture,
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
            let sql = `SELECT *, INFO_POST.picture as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id`
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

    async createPost() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try{
            let sql = "INSERT INTO INFO_POST (user_id) VALUES(?)"
            let result = await conn.query(sql, [62070096])
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
            let sql = "SELECT *, DATE_FORMAT(comment_time, '%d/%m/%Y') as `comment_date`, DATE_FORMAT(comment_time, '%H:%i') as `comment_time` FROM (SELECT * FROM INFO_COMMENT INNER JOIN USER ON INFO_COMMENT.INFO_POST_post_id="+postId+") AS `INFO_COMMENT_USER` WHERE user_id = USER_user_id ORDER BY comment_time"
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
            let sql = `INSERT INTO CONVERSATIONS(con_id, user_id_1, user_id_2) VALUES(?);`
            let result = await conn.query(sql, [payload])
            conn.commit();
            //result = msg
            //console.log(result)
            return result
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
            let sql = `SELECT USER.user_name, USER.picture, con_id, user_id_1, user_id_2 FROM USER INNER JOIN (SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${user_id}) OR (user_id_2 = ${user_id})) AS conversations ON user_id = ${user_id}`

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
            let conversation = (await conn.query(sql))[0][0]

            conn.commit();
            //result = msg
            //console.log(result)
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
            let conversation = (await conn.query(sql))[0][0]
            console.log(conversation)
            let result = await conn.query(`SELECT * FROM MESSAGES WHERE con_id = '${conversation.con_id}'`)

            conn.commit();
            //result = msg
            //console.log(result)
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`get conversation rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally get conversation')
            conn.release();
        }
    }

    
    
    async addMessage(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            //let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,picture=?, birthday = ?, phone_number = ? WHERE user_id = ?`
            let sql = "INSERT INTO MESSAGES(content, con_id, message_by) VALUES(?)"
            let result = await conn.query(sql, [payload])
            conn.commit();
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

}

module.exports = QuerySql