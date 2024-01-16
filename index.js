const { getTopics } = require('./controllers/topics.controller.js')
const { getEndpoints } = require('./controllers/api.controller.js')
const { getArticleById } = require('./controllers/articles.controller.js')

module.exports =  {getTopics, getEndpoints, getArticleById}