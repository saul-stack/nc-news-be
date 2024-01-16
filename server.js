const express = require("express")
const server = express()
const {getTopics, getEndpoints, getArticleById} = require("./index.js")

server.get('/api/topics', getTopics)
server.get('/api', getEndpoints)
server.get('/api/articles/:article_id', getArticleById)

module.exports = server
