const { deleteComment, requestAllComments, requestCommentByCommentId } = require("../models/comments.model")
const database = require("../db/connection")

exports.getAllComments = (request, response, next) => {

    requestAllComments()
    .then((comments) => {
        response.status(200).send({comments})
    })
}
exports.deleteCommentByCommentId = (request, response, next) => {

    const requestedCommentId = request.params.comment_id
    if (isNaN(requestedCommentId)) return next({"code": "400"})

    requestCommentByCommentId(requestedCommentId)
    .then((comment) => {
        if (comment[0] === undefined) throw ({code: "404"})
        deleteComment(requestedCommentId)
    })
    .then((result) => {
        response.status(204).send(result)
    })
    .catch((error) => {
    next(error)
    })
    
    
}
exports.getCommentByCommentId = (request, response, next) => {

    const requestedCommentId = request.params.comment_id

    if (isNaN(requestedCommentId)) return next({code: "400"})

    requestCommentByCommentId(requestedCommentId)
    .then((result) => {

        if (!result[0]) throw ({code: "404"})

        response.status(200).send(result[0])
    })
    .catch((error) => {
        next(error)
    })

}