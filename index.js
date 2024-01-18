const { getAllTopics } = require('./controllers/topics.controller.js')
const { getAllEndpoints } = require('./controllers/api.controller.js')
const { getAllArticles, getArticleByArticleId, getCommentsByArticleId, patchArticleByArticleId, postCommentByArticleId} = require('./controllers/articles.controller.js')


module.exports =  {getAllTopics, getAllEndpoints, getArticleByArticleId, getAllArticles, getCommentsByArticleId, postCommentByArticleId, patchArticleByArticleId}