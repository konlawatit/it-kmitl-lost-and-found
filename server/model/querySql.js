const db = require('../database/mysql')
class QuerySql {
    // constructor(sql, payload) {
    //     this.sql = sql;
    //     this.payload = sql;
    // }
    existsUser(table, column, target) {
        let sqlIsExists = `SELECT EXISTS(SELECT ${column} FROM it_lost_and_found.${table} WHERE ${column} = ${target})`
        return new Promise((resolve, reject) => {
            db.query(sqlIsExists, (err, check) => {
                if (err) reject(err)
                resolve({
                    'exists': check[0][sqlIsExists.slice(7)]
                })
            })
        })
    }
    createUser(payload) {
        let sql = `insert into it_lost_and_found.USER (user_id, user_name, firstname, lastname) values ?;`
        return new Promise((resolve, reject) => {
            console.log(payload)
            db.query(sql, [payload], (err, result) => {
                if (err) reject(err)
                resolve({
                    result
                })
            })
        })
    }
    getUser(user) {
        let sql = `SELECT * FROM it_lost_and_found.USER WHERE user_id = ${user};`
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) reject(err)
                resolve(result[0])
            })
        })
    }
}

module.exports = QuerySql