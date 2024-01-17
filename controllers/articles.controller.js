const { requestArticleById, requestAllArticles, requestCommentsByArticleId, insertComment } = require("../models/articles.model")

exports.getArticleById = (request, response, next) => {
    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return next({"code": "400"})
    
    requestArticleById(requestedArticleId)
    .then((requestedArticle) => {

        // if (!requestedArticle) return Promise.reject ({code: "404"})
        if (requestedArticle === undefined) return Promise.reject ({code: "404"})

       return response.status(200).send(requestedArticle)

    })
    .catch((err) => {
        next(err)
    })
}
exports.getAllArticles = (request, response) => {

    requestAllArticles()
    .then((articles) => {
        return response.status(200).send(articles)
    })
    
}
exports.getCommentsByArticleId = (request, response, next) => {

    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return next({"code": "400"})

    requestCommentsByArticleId(requestedArticleId)
    .then((comments) => {

        if (comments[0] === undefined) return Promise.reject ({code: "404"})
        return response.status(200).send(comments)
    })
    .catch((err)=> {
        next(err)
    })

}
exports.postComment = (request, response, next) => {



    const commentToPost = request.body
    const articleId = request.params.article_id


    requestArticleById(articleId)
    .then((requestedArticle) => {

        if (requestedArticle === undefined) {
            console.log("bing")
            return next({code: "404"})
        }

    })
    
    const {userName, body} = commentToPost

    if( userName.length < 1     ||  body.length < 1                 ||
        typeof body != "string" ||  typeof userName != "string"){

    return next({"code": "400"}) }

    insertComment(userName, body, articleId)
    .then((comment) => { 
        return response.status(201).send(comment)} 
    )

    //which errors
    .catch((error) => {
        next(error)
    })

}