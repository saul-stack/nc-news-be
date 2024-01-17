const { getTopics } = require('./controllers/topics.controller.js')
const { getAllEndpoints } = require('./controllers/api.controller.js')
const { getAllArticles, getArticleById, getCommentsByArticleId, postComment} = require('./controllers/articles.controller.js')

module.exports =  {getTopics, getAllEndpoints, getArticleById, getAllArticles, getCommentsByArticleId, postComment}