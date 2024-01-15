const express = require("express")
const server = express()
const { getTopics } = require('./controllers/topics.controller.js')

server.get('/api/topics', getTopics)

// what if the response is empty? shouldn't send a 200 surely

module.exports = server
