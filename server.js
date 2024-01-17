const express = require("express")
const server = express()
const {getTopics, getEndpoints, getArticleById, getArticles, getCommentsByArticleId} = require("./index.js")

server.get('/api', getEndpoints)
server.get('/api/topics', getTopics)
server.get('/api/articles', getArticles)
server.get('/api/articles/:article_id', getArticleById)
server.get('/api/articles/:article_id/comments', getCommentsByArticleId)

server.use((err, req, res, next) => {

    //handle 404s
    if(err.code === "404") {
        res.status(404).send({msg: "Not found"})
    }
    else next(err)
})

server.use((err, req, res, next) => {

    //handle 400s
    if(err.code === "400") {
        res.status(400).send({msg: "Bad request"})
    }
    else next(err)
})

server.use((err, req, res, next) => {

    //handle 500s
    if(err.code === "500") {
        res.status(500).send({msg: "Internal server error"})
    }
})


module.exports = server
