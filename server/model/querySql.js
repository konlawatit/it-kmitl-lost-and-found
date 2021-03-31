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
            console.log(`rolback`)
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
            let sql = `insert into USER(user_id, user_name, firstname, lastname, email, picture, birthday) values ?;`
            let result = await conn.query(sql, [payload])
            conn.commit();
            return {
                result
            }
        } catch (err) {
            await conn.rollback();
            console.log(`create user rolback`)
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
            let sql = `UPDATE USER SET user_name = ?, firstname = ?, lastname = ?, birthday = ?, picture = ? WHERE user_id = ?`
            console.log('payload', payload)
            let result = await conn.query(sql, payload)
            conn.commit();
            return result
        } catch (err) {
            await conn.rollback();
            console.log(`update profile rolback`)
            throw new Error(err)
        } finally {
            console.log('finally create user')
            conn.release();
        }
    }

    async getUser(user) {
        const conn = await pool.getConnection();
        await conn.beginTransaction()
        try {
            let sql = `SELECT * FROM USER WHERE user_id = ${user};`
            let result = await conn.query(sql)
            let user_info = result[0][0]
            conn.commit();
            return {
                "sub": user_info.user_id,
                "name": user_info.user_name,
                "sub": user_info.user_id,
                "email": user_info.email,
                "given_name": user_info.firstname,
                "family_name": user_info.lastname,
                "picture": 'http://localhost:8888/'+user_info.picture
            }
        } catch (err) {
            await conn.rollback();
            console.log(`rolback`)
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
}

module.exports = QuerySql