const server = require("../server.js");
const request = require("supertest");
const database = require("../db/connection.js");
const fs = require("fs/promises");

afterAll(() => {
  database.end();
});

describe("/api", () => {
  describe("GET /api", () => {
    test("Responds (200) with object, with keys of valid endpoint names", () => {
      let expectedProperties = {};
      fs.readFile("endpoints.json", "utf-8").then((fileContents) => {
        expectedProperties = JSON.parse(fileContents);
      });
      return request(server)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { endpoints } = body;
          expect(typeof endpoints).toBe("object");
          for (let property in expectedProperties)
            expect(endpoints.hasOwnProperty(property)).toBe(true);
        });
    });

    test("each endpoint object has correct property names", () => {
      return request(server)
        .get("/api")
        .then(({ body }) => {
          const { endpoints } = body;

          expect(Object.keys(endpoints).length > 0).toBe(true);

          for (let endpoint in endpoints) {
            expect(endpoints[endpoint].hasOwnProperty("description")).toBe(
              true
            );
            expect(endpoints[endpoint].hasOwnProperty("queries")).toBe(true);
            expect(endpoints[endpoint].hasOwnProperty("exampleResponse")).toBe(
              true
            );
            expect(endpoints[endpoint].hasOwnProperty("format")).toBe(true);
          }
        });
    });
  });
});

describe("/api/topics", () => {
  describe("GET /api/topics", () => {
    test("Responds (200) with array of topic objects, with expected property names", () => {
      return request(server)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          expect(Object.keys(body).length > 0).toBe(true);
          for (let topic in body) {
            expect(body[topic].hasOwnProperty("slug")).toBe(true);
            expect(body[topic].hasOwnProperty("description")).toBe(true);
          }
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET /api/articles", () => {
    test("Responds (200) with an array of objects", () => {
      return request(server)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;

          expect(Array.isArray(articles)).toBe(true);
          articles.forEach((article) => {
            expect(typeof article).toBe("object");
          });
        });
    });

    test("each object in the array has correct keys", () => {
      return request(server)
        .get("/api/articles")
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length > 0).toBe(true);
          articles.forEach((article) => {
            expect(article.hasOwnProperty("author")).toBe(true);
            expect(article.hasOwnProperty("title")).toBe(true);
            expect(article.hasOwnProperty("article_id")).toBe(true);
            expect(article.hasOwnProperty("topic")).toBe(true);
            expect(article.hasOwnProperty("created_at")).toBe(true);
            expect(article.hasOwnProperty("votes")).toBe(true);
            expect(article.hasOwnProperty("article_img_url")).toBe(true);
            expect(article.hasOwnProperty("comment_count")).toBe(true);

            expect(article.hasOwnProperty("body")).toBe(false);
          });
        });
    });
  });

  describe("GET /api/articles (query)", () => {
    test("Responds (200) with an array of objects with expected properties", () => {
      return request(server)
        .get("/api/articles?topic=coding")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(Array.isArray(articles)).toBe(true);
          articles.forEach((article) => {
            expect(typeof article).toBe("object");
            expect(article.hasOwnProperty("article_id")).toBe(true);
            expect(article.hasOwnProperty("title")).toBe(true);
            expect(article.hasOwnProperty("author")).toBe(true);
            expect(article.hasOwnProperty("created_at")).toBe(true);
            expect(article.hasOwnProperty("votes")).toBe(true);
            expect(article.hasOwnProperty("article_img_url")).toBe(true);
            expect(article.hasOwnProperty("comment_count")).toBe(true);

            expect(article.topic).toBe("coding");
          });
        });
    });
    test("Responds (200) with an array of objects with expected properties", () => {
      return request(server)
        .get("/api/articles?topic=coding&sort_by=votes&order=asc")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          articles.forEach((article) => {
            expect(article.topic).toBe("coding");
          });
          expect(articles).toBeSortedBy("votes", { descending: false });
        });
    });

    test("Responds (404) when no articles exist with requested topic", () => {
      return request(server).get("/api/articles?topic=fakeTopic").expect(404);
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET /api/articles/:article_id", () => {
    test("responds (200) with an object with expected properties", () => {
      return request(server)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;

          expect(article.hasOwnProperty("author")).toBe(true);
          expect(article.hasOwnProperty("title")).toBe(true);
          expect(article.hasOwnProperty("article_id")).toBe(true);
          expect(article.hasOwnProperty("topic")).toBe(true);
          expect(article.hasOwnProperty("created_at")).toBe(true);
          expect(article.hasOwnProperty("votes")).toBe(true);
          expect(article.hasOwnProperty("article_img_url")).toBe(true);
          expect(article.hasOwnProperty("comment_count")).toBe(true);
        });
    });

    test('responds (404) "Not found" when article_id valid format but not present in database', () => {
      return request(server)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test('responds (400) "Bad request" when article_id not correct format', () => {
      return request(server)
        .get("/api/articles/article1")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET /api/articles/:article_id/comments", () => {
    test("responds (200) with an array of objects with expected properties, ordered by date descending", () => {
      return request(server)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);

          body.forEach((comment) => {
            expect(comment.hasOwnProperty("votes"));
            expect(comment.hasOwnProperty("comment_id"));
            expect(comment.hasOwnProperty("created_at"));
            expect(comment.hasOwnProperty("author"));
            expect(comment.hasOwnProperty("body"));
            expect(comment.hasOwnProperty("created_at"));
            expect(comment.hasOwnProperty("article_id"));
          });

          expect(body).toBeSortedBy("created_at", { descending: true });
        });
    });

    test('responds (404) "Not found" when article_id valid format but not present in database', () => {
      return request(server)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test('responds (400) "Bad request" when article_id not correct format', () => {
      return request(server)
        .get("/api/articles/articleNumber1/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    test('responds (201) "Comment posted" with comment object with expected property values', () => {
      const commentToSend = {
        userName: "happyamy2016",
        body: "this is my review of the article you have written",
      };

      return request(server)
        .post("/api/articles/1/comments")
        .send(commentToSend)
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;

          expect(comment.body).toBe(
            "this is my review of the article you have written"
          );
          expect(comment.author).toBe("happyamy2016");
        });
    });

    test('responds (201) "Comment posted", ignoring unnecessary properties', () => {
      const commentToSend = {
        userName: "happyamy2016",
        body: "this is my review of the article you have written",
        unnecessaryField: "this data should be ignored",
      };

      return request(server)
        .post("/api/articles/1/comments")
        .send(commentToSend)
        .expect(201)
        .then(({ body }) => {
          const { comment } = body;

          expect(comment.body).toBe(
            "this is my review of the article you have written"
          );
          expect(comment.author).toBe("happyamy2016");
          expect(Object.keys(comment).includes("unnecessaryField")).toBe(false);
        });
    });

    test('responds (400) "Bad request" when given invalid object', () => {
      return request(server)
        .post("/api/articles/1/comments")
        .send({ userName: 21, body: "test" })
        .expect(400);
    });

    test('responds (404) "Username does not exist" when given object userName not present in database', () => {
      return request(server)
        .post("/api/articles/1/comments")
        .send({ userName: "fake-user34", body: "21" })
        .expect(404);
    });

    test('reponds (404) "Article not found" when given invalid path', () => {
      return request(server)
        .post("/api/articles/99999/comments")
        .send({ userName: "happyamy2016", body: "test" })
        .expect(404);
    });
  });

  describe("PATCH /api/articles/:article_id", () => {
    test("responds (200) with object with correct keys", () => {
      return request(server)
        .patch("/api/articles/3")
        .send({ inc_votes: 6 })
        .then(({ body }) => {
          const { article } = body;

          expect(typeof article).toBe("object");
          expect(article.hasOwnProperty("author")).toBe(true);
          expect(article.hasOwnProperty("title")).toBe(true);
          expect(article.hasOwnProperty("article_id")).toBe(true);
          expect(article.hasOwnProperty("body")).toBe(true);
          expect(article.hasOwnProperty("topic")).toBe(true);
          expect(article.hasOwnProperty("created_at")).toBe(true);
          expect(article.hasOwnProperty("votes")).toBe(true);
          expect(article.hasOwnProperty("article_img_url")).toBe(true);
          expect(article.hasOwnProperty("comment_count")).toBe(true);

          expect(article.votes === 6).toBe(true);
        });
    });

    test("votes property of article object can not be set less than 0", () => {
      return request(server)
        .patch("/api/articles/3")
        .send({ inc_votes: -8 })
        .then(({ body }) => {
          const { article } = body;
          expect(article.votes >= 0).toBe(true);
        });
    });

    test('responds (404) "Not found" when article_id invalid or not present in database', () => {
      return request(server)
        .patch("/api/articles/99999")
        .send({ inc_votes: 1 })
        .expect(404);
    });

    test('responds (404) "Invalid article_id" when article_id invalid', () => {
      return request(server)
        .patch("/api/articles/article23")
        .send({ inc_votes: 1 })
        .expect(400);
    });

    test('responds (400) "Bad request" when patching data not valid format', () => {
      return request(server)
        .patch("/api/articles/1")
        .send("inc_votes: 1")
        .expect(400);
    });

    test('responds (400) "Bad request" when patching data is not within acceptable bounds', () => {
      return request(server)
        .patch("/api/articles/1")
        .send({ inc_votes: -9999 })
        .expect(400)

        .then(() => {
          return request(server)
            .patch("/api/articles/1")
            .send({ inc_votes: 9999 })
            .expect(400);
        });
    });
  });
});

describe("api/comments/:comment_id", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("responds (204) with no content", () => {
      return request(server)
        .delete("/api/comments/30")
        .expect(204)
        .then(({ body }) => {
          expect(body[0] === undefined).toBe(true);
        })

        .then(() => {
          return request(server).get("/api/comments/30").expect(404);
        });
    });

    test("responds (404) when comment doesn't exist", () => {
      return request(server).delete("/api/comments/9999").expect(404);
    });

    test("responds (400) when comment_id is wrong format", () => {
      return request(server).delete("/api/comments/comment23").expect(400);
    });
  });
});

describe("/api/comments", () => {
  describe("GET /api/comments", () => {
    test("Responds (200) with an array of all commments", () => {
      return request(server)
        .get("/api/comments")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.comments)).toBeTrue;
        });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("GET /api/comments/:comment_id", () => {
    test("GET commment by comment_id", () => {
      return request(server)
        .get("/api/comments/1")
        .expect(200)
        .then((comment) => {});
    });

    test("responds (404) when comment not present in database", () => {
      return request(server).get("/api/comments/99999").expect(404);
    });

    test("responds (400) when comment_id not a number", () => {
      return request(server).get("/api/comments/commentNumber200").expect(400);
    });
  });
});

describe("/api/users", () => {
  describe("GET /api/users", () => {
    test("Responds (200) with array of objects with expected properties", () => {
      return request(server)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(Array.isArray(users)).toBe(true);
          users.forEach((user) => {
            expect(user.hasOwnProperty("username")).toBe(true);
            expect(user.hasOwnProperty("name")).toBe(true);
            expect(user.hasOwnProperty("avatar_url")).toBe(true);
          });
        });
    });
  });
});
