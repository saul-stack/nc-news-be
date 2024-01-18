const express = require("express")
const server = express()

const { getAllTopics, getAllEndpoints, getArticleByArticleId, getAllArticles, getCommentsByArticleId, postCommentByArticleId, patchArticleByArticleId, deleteCommentByCommentId, getAllComments, getCommentByCommentId } = require("./index.js")

server.use(express.json())

server.get('/api', getAllEndpoints)
server.get('/api/topics', getAllTopics)
server.get('/api/articles', getAllArticles)

server.get('/api/comments', getAllComments)
server.get('/api/comments/:comment_id', getCommentByCommentId)


server.get('/api/articles/:article_id/comments', getCommentsByArticleId)
server.get('/api/articles/:article_id', getArticleByArticleId)

server.patch('/api/articles/:article_id', patchArticleByArticleId)

server.post('/api/articles/:article_id/comments', postCommentByArticleId)

server.delete('/api/comments/:comment_id', deleteCommentByCommentId)


server.use((err, req, res, next) => {

    //handle 404s
    if(err.code === "404") res.status(404).send({msg: "Not found"})
    else next(err)
})
server.use((err, req, res, next) => {

    //handle 400s
    if(err.code === "400") res.status(400).send({msg: "Bad request"})
    else next(err)
})
server.use((err, req, res, next) => {

    //handle 500s
    if(err.code === "500") res.status(500).send({msg: "Internal server error"})
  
})

module.exports = server
