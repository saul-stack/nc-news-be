const { requestArticleById, requestArticles, requestCommentsByArticleId } = require("../models/articles.model")

exports.getArticleById = (request, response, next) => {
    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return next({"code": "400"})
    
    requestArticleById(requestedArticleId)
    .then((requestedArticle) => {

        if (!requestedArticle) return Promise.reject ({code: "404"})
       return response.status(200).send(requestedArticle)

    })
    .catch((err) => {
        next(err)
    })
}

exports.getArticles = (request, response) => {

    requestArticles()
    .then((articles) => {
        return response.status(200).send(articles)
    })
    
}

exports.getCommentsByArticleId = (request, response, next) => {

    const requestedArticleId = request.params.article_id

    if (isNaN(Number(requestedArticleId))) return next({"code": "400"})

    requestCommentsByArticleId(requestedArticleId)
    .then((comments) => {
        if (!comments[0]) return Promise.reject({"code": "404"})
        return response.status(200).send(comments)
    })
    .catch((err)=> {

        next(err)
    })

}