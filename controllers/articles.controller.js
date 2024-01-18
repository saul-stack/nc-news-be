const { requestArticleByArticleId, requestAllArticles, requestCommentsByArticleId, insertComment, updateVotes, requestArticlesByTopic} = require("../models/articles.model")

exports.getArticleByArticleId = (request, response, next) => {
    const requestedArticleId = request.params.article_id

    if (isNaN(requestedArticleId)) return next({"code": "400"})
    
    requestArticleByArticleId(requestedArticleId)
    .then((requestedArticle) => {

        // if (!requestedArticle) return Promise.reject ({code: "404"})
        if (requestedArticle === undefined) return Promise.reject ({code: "404"})

       return response.status(200).send(requestedArticle)

    })
    .catch((err) => {
        next(err)
    })
}
exports.getArticles = (request, response) => {


    const requestedTopic = request.query.topic

    if (requestedTopic) {

        requestArticlesByTopic(requestedTopic)
        .then((articles) => {
            
            if (articles[0] === undefined) return response.status(404).send()

            return response.status(200).send(articles)
        })
    }

    else {
        requestAllArticles()
        .then((articles) => {
            return response.status(200).send(articles)
        })
    }
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
exports.postCommentByArticleId = (request, response, next) => {



    const commentToPost = request.body
    const articleId = request.params.article_id


    requestArticleByArticleId(articleId)
    .then((requestedArticle) => {

        if (requestedArticle === undefined) {
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
exports.patchArticleByArticleId = (request, response, next) => {

    
    const requestedArticleId = request.params.article_id
    
    
    if (isNaN(Number(requestedArticleId))) return next(({ code: "404" }))

    if (request.body.inc_votes === undefined    || 
        request.body.inc_votes > 999            || 
        request.body.inc_votes < -999) return next({code: "400"})

    requestArticleByArticleId(requestedArticleId)

    .then((requestedArticle) => {

        if (requestedArticle === undefined) return next({code: "404"})

        let newTotalVotes = requestedArticle.votes + request.body.inc_votes

        if (newTotalVotes < 1) { newTotalVotes = 0 } 
    
        return updateVotes(requestedArticleId, newTotalVotes)
    })

    .then((result) => {


        return response.status(200).send(result)
    })

    

}