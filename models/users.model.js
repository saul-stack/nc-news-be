const database = require("../db/connection")

exports.requestAllUsers = () => {

    return database.query(`SELECT * from users;`)

    .then(({rows}) => {       
        return rows
    })

}


exports.requestUserByUserName = (requestedUserName) => {

    return database.query(`
    SELECT * FROM users
    WHERE username = $1
    `, [requestedUserName])
    
    .then(({rows}) => {
        return (rows[0])
    })

}