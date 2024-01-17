const { requestArticleById, requestArticles, requestComments } = require("../models/articles.model")

exports.getArticleById = (request, response) => {
    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return response.status(400).send({msg: "Bad request"})
    
    requestArticleById(requestedArticleId)
    .then((requestedArticle) => {

        if (requestedArticle === undefined) return response.status(404).send({msg: "Not found"})
       return response.status(200).send(requestedArticle)

    })
}

exports.getArticles = (request, response) => {

    requestArticles()
    .then((articles) => {
        return response.status(200).send(articles)
    })
    
}

//for each article object, get its article_id

//commentCount = (query comments table for all results where article_id matches).length

//article.comment_count = commentCount
