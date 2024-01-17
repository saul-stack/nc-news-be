const { requestArticleById, requestAllArticles, requestCommentsByArticleId } = require("../models/articles.model")

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