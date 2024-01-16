const express = require("express")
const server = express()
const {getTopics, getEndpoints} = require("./index.js")

server.get('/api/topics', getTopics)
server.get('/api', getEndpoints)

module.exports = server
