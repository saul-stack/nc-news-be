const database = require("../db/connection")

exports.deleteComment = (requestedCommentId) => {

    return database.query(`
    DELETE FROM comments
    WHERE comment_id = ${requestedCommentId};
    `)

    .then(({rows}) => {
        return (rows)
    })

}

exports.requestAllComments = () => {

    return database.query(`
    SELECT * FROM comments;
    `)

    .then(({rows}) => {

        return (rows)
    })
}

exports.requestCommentByCommentId = (requestedCommentId) => {

    return database.query(`
    SELECT * FROM comments
    WHERE comment_id = ${requestedCommentId}
    `)
    
    .then(({rows}) => {
        return (rows)
    })

}