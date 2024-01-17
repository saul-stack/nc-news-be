const database = require("../db/connection")

exports.requestArticleById = (requestedArticleId) => {
    return database.query(`SELECT * FROM articles WHERE article_id = ${requestedArticleId};`)
    .then((result) => {
        return (result.rows[0])
    })

    .catch((err) => {
        console.log(err)
    })
}

exports.requestArticles = () => {

    //unable to apply article_id from comments table to articles[i].comment_count so using null 

    return database.query(`SELECT * FROM articles ORDER BY created_at;`)
    .then((result) => {
        articlesObject = result.rows
        articlesObject.forEach((article) => {
            delete article.body
            article.comment_count = null
        })
        return (articlesObject)
    })
   
    .catch(() => {
        console.log(err)

    })

}