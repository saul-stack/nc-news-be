const { requestArticleById } = require("../models/articles.model")

exports.getArticleById = (request, response) => {
    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return response.status(400).send({msg: "Bad request"})
    
    requestArticleById(requestedArticleId)
    .then((requestedArticle) => {

        if (requestedArticle === undefined) return response.status(404).send({msg: "Not found"})
       return response.status(200).send(requestedArticle)

    })
}
