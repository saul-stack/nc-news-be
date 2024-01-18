const database = require("../db/connection")

module.exports.deleteComment = (requestedCommentId) => {

    return database.query(`
    DELETE FROM comments
    WHERE comment_id = ${requestedCommentId};
    `)

    .then((result) => {
        return (result.rows)
    })

}

module.exports.requestAllComments = () => {

return database.query(`
SELECT * FROM comments;
`)

.then((result) => {

    return (result.rows)
})

}

module.exports.requestCommentByCommentId = (requestedCommentId) => {

    return database.query(`
    SELECT * FROM comments
    WHERE comment_id = ${requestedCommentId}
    `)

    .then((result) => {
        return (result.rows)
    })

}