const database = require("../db/connection");

exports.requestArticleByArticleId = (requestedArticleId) => {
  return database
    .query(
      `

    SELECT
    articles.article_id,
    articles.body,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    article_img_url,

    COUNT(comments.comment_id) AS comment_count

    FROM
    articles

    LEFT JOIN
    comments ON comments.article_id = articles.article_id

    WHERE articles.article_id = $1

    GROUP BY
    articles.article_id

    ORDER BY
    articles.created_at DESC
    
    ;`,
      [requestedArticleId]
    )

    .then(({ rows }) => {
      return rows[0];
    })

    .catch((err) => {
      next(err);
    });
};

exports.requestArticles = (topic, sort_by = "created_at", order = "DESC") => {
  let queryString = `
      SELECT
        articles.article_id,
        articles.title,
        articles.topic,
        articles.author,
        articles.created_at,
        articles.votes,
        article_img_url,
        COUNT(comments.comment_id) AS comment_count
      FROM
        articles
      LEFT JOIN
        comments ON comments.article_id = articles.article_id`;

  const params = [];

  if (topic) {
    queryString += ` WHERE topic = $1`;
    params.push(topic);
  }

  queryString += `
      GROUP BY
        articles.article_id
      ORDER BY
        ${sort_by} ${order};`;

  return database.query(queryString, params).then(({ rows }) => {
    return rows;
  });
};
exports.requestCommentsByArticleId = (requestedArticleId) => {
  return database
    .query(
      `
    SELECT * FROM comments WHERE article_id = $1
    ORDER BY created_at DESC
    ;`,
      [requestedArticleId]
    )

    .then(({ rows }) => {
      return rows;
    })

    .catch((err) => {
      next(err);
    });
};
exports.insertComment = (userName, commentBody, articleId) => {
  return database
    .query(
      `
    INSERT INTO comments (author, body, article_id)
    VAlUES ($1, $2, $3)
    RETURNING *;`,
      [userName, commentBody, articleId]
    )
    .then(({ rows }) => {
      return rows[0];
    })

    .catch((err) => {
      next(err);
    });
};
exports.updateVotes = (articleId, newTotalVotes) => {
  return database
    .query(
      `
    UPDATE articles
    SET votes = $1
    WHERE article_id = $2
    `,
      [newTotalVotes, articleId]
    )

    .then(() => {
      return database.query(
        `
    SELECT
    articles.article_id,
    articles.body,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    article_img_url,

    COUNT(comments.comment_id) AS comment_count

    FROM
    articles

    LEFT JOIN
    comments ON comments.article_id = articles.article_id

    WHERE articles.article_id = $1

    GROUP BY
    articles.article_id

    `,
        [articleId]
      );
    })

    .then(({ rows }) => {
      return rows[0];
    });
};
