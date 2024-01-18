const { getAllTopics } = require('./controllers/topics.controller.js')
const { getAllEndpoints } = require('./controllers/api.controller.js')
const { getAllArticles, getArticleByArticleId, getCommentsByArticleId, patchArticleByArticleId, postCommentByArticleId} = require('./controllers/articles.controller.js')
const { deleteCommentByCommentId, getAllComments, getCommentByCommentId } = require('./controllers/comments.controller.js')

module.exports =  {getAllComments, getAllTopics, getAllEndpoints, getArticleByArticleId, getAllArticles, getCommentsByArticleId, postCommentByArticleId, patchArticleByArticleId, deleteCommentByCommentId, getCommentByCommentId}