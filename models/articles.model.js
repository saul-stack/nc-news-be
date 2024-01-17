const database = require("../db/connection")

exports.requestArticleById = (requestedArticleId) => {
    return database.query(`

    SELECT
    articles.article_id,
    articles.body,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    article_img_url,

    COUNT(comments.comment_id) AS comment_count

    FROM
    articles


    LEFT JOIN
    comments ON comments.article_id = articles.article_id

    WHERE articles.article_id = ${requestedArticleId}

    GROUP BY
    articles.article_id

    ORDER BY
    articles.created_at DESC
    

    ;`)
    
    .then((result) => {
               
        return (result.rows[0])
    })

    .catch((err) => {
        next(err)
    })
}
exports.requestAllArticles = () => {

    return database.query(`

    SELECT
    articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    article_img_url,

    COUNT(comments.comment_id) AS comment_count

    FROM
    articles

    LEFT JOIN
    comments ON comments.article_id = articles.article_id

    GROUP BY
    articles.article_id

    ORDER BY
    articles.created_at DESC;`)

    .then((result) => {
        articlesObject = result.rows
        return (articlesObject)
    })
   
    .catch((err) => {
        next(err)
    })

}
exports.requestCommentsByArticleId = (requestedArticleId) => {
    return database.query(`
    SELECT * FROM comments WHERE article_id = ${requestedArticleId}
    ORDER BY created_at DESC
    ;`)
    
    .then((result) => {
        return (result.rows)
    })

    .catch((err) => {
        next(err)
    })
}
exports.insertComment = (userName, commentBody, articleId) => {

    return database.query(`
    INSERT INTO comments (author, body, article_id)
    VAlUES ($1, $2, $3)
    RETURNING *;`,
    [userName, commentBody, articleId]
    )
    .then((result) => {
        return result.rows
    })

    .catch((err) => {
        next(err)
    })



}

