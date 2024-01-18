const { getAllTopics } = require('./controllers/topics.controller.js')
const { getAllEndpoints } = require('./controllers/api.controller.js')
const { getArticles, getArticleByArticleId, getCommentsByArticleId, patchArticleByArticleId, postCommentByArticleId} = require('./controllers/articles.controller.js')
const { deleteCommentByCommentId, getAllComments, getCommentByCommentId } = require('./controllers/comments.controller.js')
const { getAllUsers } = require('./controllers/users.controller.js')

module.exports =  {getAllComments, getAllTopics, getAllEndpoints, getArticleByArticleId, getArticles, getCommentsByArticleId, postCommentByArticleId, patchArticleByArticleId, deleteCommentByCommentId, getCommentByCommentId, getAllUsers}