const express = require("express")
const server = express()
const {getTopics, getEndpoints, getArticleById, getArticles} = require("./index.js")

server.get('/api', getEndpoints)
server.get('/api/topics', getTopics)
server.get('/api/articles', getArticles)
server.get('/api/articles/:article_id', getArticleById)

module.exports = server
