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
            let sql = `SELECT * FROM INFO_POST;`
            let posts = (await conn.query(sql))[0]
            let result = posts.map(async data => {
                data['user'] = await this.getUser(data.user_id)
                return data
            })
            conn.commit();
            return result
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

    async createComment(payload) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            console.log(payload)
            let sql = "INSERT INTO INFO_COMMENT(comment_desc, INFO_POST_post_id, USER_user_id, comment_time) VALUES(?)"
            let result = await conn.query(sql, [payload])
            conn.commit()
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`create comment rolback`, err)
            throw new Error(err)
        } finally {
            console.log('finally create comment')
            conn.release();
        }
    }
}

module.exports = QuerySql