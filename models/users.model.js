const database = require("../db/connection")

exports.requestAllUsers = () => {

    return database.query(`SELECT * from users;`)

    .then((result) => {       
        return result.rows
    })

}
