const database = require("../db/connection")

exports.requestAllTopics = () => {

    return database.query(`SELECT * from topics;`)

    .then((result) => {       
        return result.rows
    })

}


