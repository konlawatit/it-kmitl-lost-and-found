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
            let sql = `SELECT EXISTS(select ${column} from ${table} where ${column} = '${target}') isExists`
            console.log(sql)
            let isExists = await conn.query(sql)
            conn.commit();
            console.log(isExists[0])
            return {
                'exists': isExists[0][0]['isExists']
            }
        } catch (err) {
            await conn.rollback();
            console.log(`rolback exists`, err)
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
            let sql = "INSERT INTO USER ( user_name, firstname, lastname, email, image, birthday, phone_number, `type`, `role`) VALUES ?"
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
            let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ? ,image=?, birthday = ?, phone_number = ? WHERE user_id = ?`
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
            let sql = `SELECT *, DATE_FORMAT(birthday, '%Y-%m-%d') as birthday FROM USER WHERE email = '${user}';`
            let result = await conn.query(sql)
            let user_info = result[0][0]
            console.log('user info', user_info)
            conn.commit();
            return {
                "user_id": user_info.user_id,
                "user_name": user_info.user_name,
                "email": user_info.email,
                "fname": user_info.firstname,
                "lname": user_info.lastname,
                "image": 'http://localhost:8888/' + user_info.image,
                'type': user_info.type,
                'role': user_info.role,
                'phone_number': user_info.phone_number,
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

    async allUser() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT * FROM USER`
            let users = await conn.query(sql)
            await users[0].map(data => {
                data['image'] = 'http://localhost:8888/' + data['image']
                return data
            })
            conn.commit();
            return users[0]
        } catch (err) {
            console.log(err)
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all user')
            conn.release();
        }
    }

    async allUserBan() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT * FROM USER WHERE role = 'banned'`
            let users = await conn.query(sql)
            await users[0].map(data => {
                data['image'] = 'http://localhost:8888/' + data['image']
                return data
            })
            conn.commit();
            return users[0]
        } catch (err) {
            console.log(err)
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all user')
            conn.release();
        }
    }

    async normaltoAdmin(id) {
        const conn = await pool.getConnection();
        try {
            let sql = `UPDATE USER SET role = 'admin' WHERE user_id = ?`
            let user = await conn.query(sql, [id])
            conn.commit()
            return {
                user
            }
        } catch (err) {
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit role")
            conn.release();
        }
    }

    async admintoNormal(id) {
        const conn = await pool.getConnection();
        try {
            let sql = `UPDATE USER SET role = 'normal' WHERE user_id = ?`
            let user = await conn.query(sql, [id])
            conn.commit()
            return {
                user
            }
        } catch (err) {
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit role")
            conn.release();
        }
    }

    async banUser(id) {
        const conn = await pool.getConnection();
        try {
            let sql = `UPDATE USER SET role = 'banned' WHERE user_id = ?`
            let user = await conn.query(sql, [id])
            conn.commit()
            return {
                user
            }
        } catch (err) {
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit role")
            conn.release();
        }
    }

    async unlockBanUser(id) {
        const conn = await pool.getConnection();
        try {
            let sql = `UPDATE USER SET role = 'normal' WHERE user_id = ?`
            let user = await conn.query(sql, [id])
            conn.commit()
            return {
                user
            }
        } catch (err) {
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally unlock ban")
            conn.release();
        }
    }

    async searchUser(data) {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let str = await conn.query("SELECT * FROM USER WHERE user_name like ?", ['%' + data + '%'])
            await str[0].map(data => {
                data['picture'] = 'http://localhost:8888/' + data['picture']
                return data
            })
            conn.commit()
            return str[0]
        } catch (err) {
            console.log(err)
            await conn.rollback();
            return next(err)
        }
        finally {
            conn.release()
        }
    }

    async searchUserBan(data) {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let str = await conn.query("SELECT * FROM USER WHERE user_name like ? && role = 'banned'", ['%' + data + '%'])
            await str[0].map(data => {
                data['picture'] = 'http://localhost:8888/' + data['picture']
                return data
            })
            conn.commit()
            return str[0]
        } catch (err) {
            console.log(err)
            await conn.rollback();
            return next(err)
        }
        finally {
            conn.release()
        }
    }

    async searchPosts(data) {
        const conn = await pool.getConnection()
        await conn.beginTransaction();
        try {
            let str = await conn.query("SELECT *, DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST WHERE topic like ?", ['%' + data + '%'])
            conn.commit()
            return str[0]
        } catch (err) {
            console.log(err)
            await conn.rollback();
            return next(err)
        }
        finally {
            conn.release()
        }
    }

    async allPosts() {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            //"SELECT *FROM (SELECT * FROM INFO_COMMENT INNER JOIN USER ON INFO_COMMENT.INFO_POST_post_id="+postId+") AS `INFO_COMMENT_USER` WHERE user_id = USER_user_id ORDER BY comment_time"
            // let sql = `SELECT *, INFO_POST.image as post_picture, USER.picture as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.user_id = USER.user_id order by INFO_POST.post_time desc`
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id WHERE INFO_POST.status = 1 order by INFO_POST.post_time desc`
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

    async myPosts(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id wHERE USER.user_id = ? order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async onePosts(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id wHERE INFO_POST.post_id = ?`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async myLostPosts(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id wHERE USER.user_id = ? and INFO_POST.category_post = 'lost' AND INFO_POST.status = 1 order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async myFoundPosts(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id wHERE USER.user_id = ? and INFO_POST.category_post = 'found' AND INFO_POST.status = 1 order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
            throw new Error(err)
        } finally {
            console.log('finally all my post')
            conn.release();
        }
    }

    async myCompletePosts(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id wHERE USER.user_id = ? AND INFO_POST.status = 0 order by INFO_POST.post_time desc`
            let myposts = await conn.query(sql, [id])
            await myposts[0].map(data => {
                data['user_picture'] = 'http://localhost:8888/' + data['user_picture']
                return data
            })
            conn.commit();
            return myposts[0]
        } catch (err) {
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
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id WHERE INFO_POST.category_post = 'lost' AND INFO_POST.status = 1 order by INFO_POST.post_time desc`
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
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id WHERE INFO_POST.category_post = 'found' AND INFO_POST.status = 1 order by INFO_POST.post_time desc`
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
            let sql = "INSERT INTO INFO_POST (USER_user_id, topic, category_post, post_desc, post_time, place, status) VALUES(?, ?, ?, ?, ?, ?, 1)"
            let result = await conn.query(sql, [data.userid, data.topic, data.categoryPost, data.postDesc, data.post_time, data.place])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            await conn.rollback();
            console.log(err)
            console.log(`create post rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create post')
            conn.release();
        }
    }

    async editPost(data) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = "UPDATE INFO_POST SET topic = ?, category_post = ?, post_desc = ?, place = ? where post_id = ?"
            let result = await conn.query(sql, [data.topic, data.type, data.post_desc, data.place, data.id])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            console.log(err)
            console.log("err คิวรี่")
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit post")
            conn.release();
        }
    }

    async deletePost(id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql1 = "DELETE FROM INFO_POST_POST_IMAGE WHERE INFO_POST_post_id = ?"
            await conn.query(sql1, [id])
            let sql2 = "DELETE FROM CATEGORY_ITEM_INFO_POST WHERE INFO_POST_post_id = ?"
            await conn.query(sql2, [id])
            let sql3 = "DELETE FROM INFO_COMMENT_COMMENT_IMAGE WHERE INFO_COMMENT_comment_no in (\
            SELECT comment_no FROM INFO_COMMENT WHERE INFO_POST_post_id = ?)"
            await conn.query(sql3, [id])
            let sql4 = "DELETE FROM INFO_COMMENT WHERE INFO_POST_post_id = ?;"
            await conn.query(sql4, [id])
            let sql5 = "DELETE FROM INFO_POST WHERE post_id = ?"
            await conn.query(sql5, [id])
            conn.commit()
            return result
        } catch (err) {
            console.log(err)
            await conn.rollback();
        } finally {
            console.log("finally delete post")
            conn.release()
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

    async editComment(data) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = "UPDATE INFO_COMMENT SET comment_desc = ? WHERE comment_no = ?"
            let result = await conn.query(sql, [data.comment_desc, data.comment_no])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            console.log(err)
            console.log("err คิวรี่")
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit comment")
            conn.release();
        }
    }

    async deleteComment(data){
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try{
            let sql = "DELETE FROM INFO_COMMENT_COMMENT_IMAGE WHERE INFO_COMMENT_comment_no = ?"
            await conn.query(sql, [data])
            let sql2 = "DELETE FROM INFO_COMMENT WHERE comment_no = ?"
            await conn.query(sql2, [data])
            conn.commit()
        } catch (err){
            console.log(err)
            console.log("err คิวรี่")
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally delete comment")
            conn.release()
        }
    }

    async createConversation(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction();
        try {
            console.log('payload', payload)
            let checkConversationExists = `SELECT EXISTS(
                 SELECT * FROM CONVERSATION WHERE (
                     USER_user_id_1 = ${payload[0]} AND USER_user_id_2 = ${payload[1]}) OR (USER_user_id_1 = ${payload[1]} AND USER_user_id_2 = ${payload[0]})) as 'exists'`
            //let checkConversationExists = `SELECT * FROM CONVERSATIONS WHERE (user_id_1 = ${payload[1]} AND user_id_2 = ${payload[2]}) OR (user_id_1 = ${payload[2]} AND user_id_2 = ${payload[1]})`
            console.log(checkConversationExists)
            let conversationExists = (await conn.query(checkConversationExists))[0][0]['exists']
            if (conversationExists > 0) {
                conn.commit();
                return false
            } else {
                let sql = `INSERT INTO CONVERSATION( USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES( ${payload[0]}, ${payload[1]}, 0, 0);`
                let result = await conn.query(sql)
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
            let sql = `SELECT USER.user_name, USER.image, USER.user_id, con_id, USER_user_id_1, USER_user_id_2, noti_user_id_2,
            CASE WHEN USER_user_id_1 = ${user_id} THEN noti_user_id_1 
            ELSE noti_user_id_2 
            END AS notification 
            FROM USER JOIN 
            (SELECT * FROM CONVERSATION WHERE (USER_user_id_1 = ${user_id}) OR (USER_user_id_2 = ${user_id})) AS conversation ON 
            (user_id = USER_user_id_2 AND USER_user_id_2 != ${user_id}) or (user_id = USER_user_id_1 AND USER_user_id_1 != ${user_id})`

            let result = await conn.query(sql)
            console.log(sql)

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
            let sql = `SELECT * FROM CONVERSATION WHERE (USER_user_id_1 = ${user_id} AND USER_user_id_2 = ${another_id}) OR (USER_user_id_1 = ${another_id} AND USER_user_id_2 = ${user_id})`
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
            let sql = `SELECT * FROM CONVERSATION WHERE (USER_user_id_1 = ${user_id} AND USER_user_id_2 = ${another_id}) OR (USER_user_id_1 = ${another_id} AND USER_user_id_2 = ${user_id})`
            let conversation = (await conn.query(sql))[0][0]
            conn.commit();
            let result = await conn.query(`SELECT CONVERSATION_con_id 'con_id', content, msg_no, USER_user_id message_by, msg_time, is_image  FROM MESSAGES WHERE CONVERSATION_con_id = '${conversation.con_id}'`)

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
            let sql = "INSERT INTO MESSAGES(content, CONVERSATION_con_id, USER_user_id, is_image, msg_time) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP)"
            conn.commit();
            let result = await conn.query(sql, [payload[0], payload[1], payload[2], payload[3]])
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
            let sql = `UPDATE CONVERSATION SET noti_user_id_1 = CASE 
            WHEN USER_user_id_1 = ${target_id} THEN noti_user_id_1 + 1
            ELSE noti_user_id_1
            END, 
            noti_user_id_2 = CASE 
            WHEN USER_user_id_2 = ${target_id} THEN noti_user_id_2 + 1 
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
            let sql = `UPDATE CONVERSATION SET noti_user_id_1 = CASE 
            WHEN USER_user_id_1 = ${target_id} THEN 0
            ELSE noti_user_id_1
            END, 
            noti_user_id_2 = CASE 
            WHEN USER_user_id_2 = ${target_id} THEN 0
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

    async addItem(item){
        const conn = await pool.getConnection();
        try{
            let sql = `INSERT INTO CATEGORY_ITEM (name, USER_user_id, image) values(?, 21, './static/uploads/imageItem/newItem.png')`
            let result = await conn.query(sql, [item, item])
            conn.commit()
            return{
                result
            }
        } catch(err){
            await conn.rollback()
            console.log(err)
            throw new Error(err)
        } finally {
            console.log('finally add item')
            conn.release()
        }
    }

    async getItemPosts(){
        const conn = await pool.getConnection();
        try{
            let sql = `SELECT name FROM CATEGORY_ITEM`
            let result = await conn.query(sql)
            conn.commit()
            return result[0]
        } catch(err){
            await conn.rollback()
            console.log(err)
            throw new Error(err)
        } finally {
            console.log('finally add item')
            conn.release()
        }
    }

    async postbyDate(date) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id WHERE INFO_POST.post_time like ? order by INFO_POST.post_time desc`
            let posts = await conn.query(sql, ["%"+date+"%"])
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
            console.log(`rolback`+ date)
            throw new Error(err)
        } finally {
            console.log('finally all post')
            conn.release();
        }
    }

    async myPostbyDate(date, id) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT *, USER.image as user_picture, DATE_FORMAT(INFO_POST.post_time, '%d/%m/%Y') as post_date , DATE_FORMAT(INFO_POST.post_time, '%H:%i') as post_time FROM INFO_POST INNER JOIN USER ON INFO_POST.USER_user_id = USER.user_id WHERE INFO_POST.post_time like ? AND USER.user_id = ? order by INFO_POST.post_time desc`
            let posts = await conn.query(sql, ["%"+date+"%", id])
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
            console.log(`rolback`+ date)
            throw new Error(err)
        } finally {
            console.log('finally all post')
            conn.release();
        }
    }

    async completePost(id, date) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = "UPDATE INFO_POST SET status = 0, complete_time = ? where post_id = ?"
            let result = await conn.query(sql, [date, id])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            console.log(err)
            console.log("err คิวรี่")
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit post")
            conn.release();
        }
    }

    async inCompletePost(data) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = "UPDATE INFO_POST SET status = 1, complete_time = null where post_id = ?"
            let result = await conn.query(sql, [data])
            conn.commit()
            return {
                result
            }
        } catch (err) {
            console.log(err)
            console.log("err คิวรี่")
            await conn.rollback();
            throw new Error(err)
        } finally {
            console.log("finally edit post")
            conn.release();
        }
    }

}

module.exports = QuerySql