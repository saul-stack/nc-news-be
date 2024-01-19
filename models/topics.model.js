const database = require("../db/connection")

exports.requestAllTopics = () => {

    return database.query(`SELECT * from topics;`)

    .then(({rows}) => {       
        return rows
    })

}


