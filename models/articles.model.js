const database = require("../db/connection")

exports.requestArticleById = (requestedArticleId) => {
    return database.query(`SELECT * FROM articles WHERE article_id = ${requestedArticleId}`)
    .then((result) => {
        return (result.rows[0])
    })

    .catch((err) => {
        console.log(err)
    })
}