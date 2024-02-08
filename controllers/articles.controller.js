const {
  requestArticleByArticleId,
  requestCommentsByArticleId,
  insertComment,
  updateVotes,
  requestArticles,
} = require("../models/articles.model");
const { requestUserByUserName } = require("../models/users.model");

exports.getArticleByArticleId = (request, response, next) => {
  const requestedArticleId = request.params.article_id;

  if (isNaN(requestedArticleId)) throw { code: "400" };

  requestArticleByArticleId(requestedArticleId)
    .then((article) => {
      if (article === undefined) throw { code: "404" };
      return response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (request, response) => {
  //   console.log(request.query);
  //   console.log(request.params);
  //   unify getArticleByArticleId into this function, passing an object

  const { topic, sort_by, order } = request.query;

  requestArticles(topic, sort_by, order).then((articles) => {
    if (articles[0] === undefined) return response.status(404).send();

    return response.status(200).send({ articles });
  });
};
exports.getCommentsByArticleId = (request, response, next) => {
  const requestedArticleId = request.params.article_id;

  if (isNaN(requestedArticleId)) throw { code: "400" };

  requestCommentsByArticleId(requestedArticleId)
    .then((comments) => {
      if (comments[0] === undefined) return Promise.reject({ code: "404" });
      return response.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};
exports.postCommentByArticleId = (request, response, next) => {
  const commentToPost = request.body;
  const articleId = request.params.article_id;

  requestArticleByArticleId(articleId)
    .then((requestedArticle) => {
      if (requestedArticle === undefined) {
        throw { code: "404" };
      }
    })
    .catch((error) => {
      next(error);
    });

  const { userName, body } = commentToPost;

  if (
    userName.length < 1 ||
    body.length < 1 ||
    typeof body != "string" ||
    typeof userName != "string"
  ) {
    return next({ code: "400" });
    // throw ({"code": "400"})
  }

  requestUserByUserName(userName)
    .then((user) => {
      if (user === undefined) throw { code: "404" };
    })
    .catch((error) => {
      next(error);
    });

  insertComment(userName, body, articleId)
    .then((comment) => {
      return response.status(201).send({ comment });
    })
    .catch((error) => {
      next(error);
    });
};
exports.patchArticleByArticleId = (request, response, next) => {
  const requestedArticleId = request.params.article_id;

  if (isNaN(Number(requestedArticleId))) return next({ code: "400" });

  if (
    request.body.inc_votes === undefined ||
    request.body.inc_votes > 999 ||
    request.body.inc_votes < -999
  )
    return next({ code: "400" });

  requestArticleByArticleId(requestedArticleId)
    .then((requestedArticle) => {
      if (requestedArticle === undefined) throw { code: "404" };

      let newTotalVotes = requestedArticle.votes + request.body.inc_votes;

      if (newTotalVotes < 1) {
        newTotalVotes = 0;
      }

      return updateVotes(requestedArticleId, newTotalVotes);
    })
    .then((article) => {
      return response.status(200).send({ article });
    })
    .catch((error) => {
      next(error);
    });
};
