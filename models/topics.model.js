//defining the database
const database = require("../db/connection")

module.exports.requestAllTopics = () => {

    //send generic PSQL query
    return database.query(`SELECT * from topics;`)

    //return PSQL response
    .then((result) => {       
        return result.rows
    })

    .catch((err) => {
        console.log(err)
    })
}


