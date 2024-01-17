
'
SELECT
article_id,
COUNT(comments.article_id) AS comment_count
FROM comments
GROUP BY article_id

INNER JOIN articles ON (comments.article_id = articles.article_id)

;`

SELECT
*
FROM articles

INNER JOIN COUNT(comments article_id) ON (articles.article_id= comments.article_id