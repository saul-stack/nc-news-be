const { deleteComment, requestAllComments, requestCommentByCommentId } = require("../models/comments.model")
const database = require("../db/connection")

exports.getAllComments = (request, response, next) => {

    requestAllComments()
    .then((allComments) => {
        response.status(200).send(allComments)
    })
}

exports.deleteCommentByCommentId = (request, response, next) => {

    const requestedCommentId = request.params.comment_id

    if (isNaN(requestedCommentId)) return next({"code": "400"})

    requestCommentByCommentId(requestedCommentId)
    .then((comment) => {
        if (comment[0] === undefined) return next({code: "404"})

        deleteComment(requestedCommentId)
        .then((result) => {
            response.status(204).send(result)
        })
    })
    
}

exports.getCommentByCommentId = (request, response, next) => {

    const requestedCommentId = request.params.comment_id

    if (isNaN(requestedCommentId)) return next ({code: "400"})

    requestCommentByCommentId(requestedCommentId)
    .then((result) => {

        if (!result[0]) return next({code: "404"})

        response.status(200).send(result[0])
    })

}