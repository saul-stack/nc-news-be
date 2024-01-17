const server = require('../server.js')
const request = require('supertest')
const database = require("../db/connection.js")
const fs = require("fs/promises")
const { requestArticles } = require('../models/articles.model.js')

afterAll(() => database.end())

describe('/api', () => {

    describe('GET /api', () => {

        test('Responds (200) with object, with keys of valid endpoint names', () => {
            return request(server)
            .get('/api')
            .expect(200)
            .then((response) => {

                expect (typeof response.body).toBe("object")
                expect(response.body.hasOwnProperty('GET /api')).toBe(true)
                expect(response.body.hasOwnProperty('GET /api/topics')).toBe(true)
                expect(response.body.hasOwnProperty('GET /api/articles')).toBe(true)

            })
        })

        test('each endpoint object has correct property names', () => {
            return request(server)
            .get('/api')

            .then((response) => {
                
                //if array.length > 0, for each element in there, check it has correct property names
                (Object.keys(response.body)).forEach((key) => {
                    expect((response.body[key]).hasOwnProperty('description')).toBe(true)
                    expect((response.body[key]).hasOwnProperty('queries')).toBe(true)
                    expect((response.body[key]).hasOwnProperty('exampleResponse')).toBe(true)
                    expect((response.body[key]).hasOwnProperty('format')).toBe(true)

                })     
            })
            

        })
    })
})

describe('/api/topics', () => {

    describe('GET /api/topics', () => {

        test('Responds (200) with array of objects, with expected keys', () => {
            return request(server)
            .get('/api/topics')
            .expect(200)
            .then((response) => {

                expect(Array.isArray(response.body)).toBe(true)
                for (let entry of response.body) {
                    expect(entry.hasOwnProperty('slug')).toBe(true)
                    expect(entry.hasOwnProperty('description')).toBe(true)
                }
        
            })
        })

    })
    
})

describe('/api/articles', () => {
    describe('GET /api/articles', () => {
        test('Responds (200) with an array of objects', () => {
            return request(server)
            .get('/api/articles')
            .expect(200)
            .then((articles) => {
                expect(Array.isArray(articles.body)).toBe(true)
                articles.body.forEach((article) => {
                    expect(typeof article).toBe("object")
                })
            })
        })

        test('each object in the array has correct keys', () => {
            return request(server)
            .get('/api/articles')
            .then((articles) => {

                expect(articles.body.length > 0).toBe(true)

                articles.body.forEach((article) => {

                    expect(article.hasOwnProperty("author")).toBe(true)
                    expect(article.hasOwnProperty("title")).toBe(true)
                    expect(article.hasOwnProperty("article_id")).toBe(true)
                    expect(article.hasOwnProperty("topic")).toBe(true)
                    expect(article.hasOwnProperty("created_at")).toBe(true)
                    expect(article.hasOwnProperty("votes")).toBe(true)
                    expect(article.hasOwnProperty("article_img_url")).toBe(true)
                    expect(article.hasOwnProperty("comment_count")).toBe(true)

                    expect(article.hasOwnProperty("body")).toBe(false)
                })
            })
        })

    })

    describe('/api/articles/:article_id', () => {

        describe('GET /api/articles/:article_id', () => {

            test('responds (200) with an object with expected properties', () => {

                return request(server)
                .get('/api/articles/1')
                .expect(200)
                .then((response) => {
                    expect(response.body.hasOwnProperty("author"))
                    expect(response.body.hasOwnProperty("title"))
                    expect(response.body.hasOwnProperty("article_id"))
                    expect(response.body.hasOwnProperty("body"))
                    expect(response.body.hasOwnProperty("topic"))
                    expect(response.body.hasOwnProperty("created_at"))
                    expect(response.body.hasOwnProperty("votes"))
                    expect(response.body.hasOwnProperty("article_img_url"))
                })    
            })

            test('responds (404) "Not found" when article_id valid format but not present in database', () => {
                
                return request(server)
                .get('/api/articles/9999')
                .expect(404)
                .then((response) => {
                    expect((response.body.msg)).toBe("Not found")
                })
            })

            test('responds (400) "Bad request" when article_id not correct format', () => {
                
                return request(server)
                .get('/api/articles/article1')
                .expect(400)
                .then((response) => {
                    expect((response.body.msg)).toBe("Bad request")
                })
            })
        })
    })

    describe('/api/articles/:article_id/comments', () => {

        test('responds (200) with an array of objects with expected properties', () => {

            return request(server)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((comments) => {

                expect (Array.isArray(comments.body)).toBe(true)

                comments.body.forEach((comment) => {
                    expect(comment.hasOwnProperty("comment_id"))
                    expect(comment.hasOwnProperty("votes"))
                    expect(comment.hasOwnProperty("created_at"))
                    expect(comment.hasOwnProperty("author"))
                    expect(comment.hasOwnProperty("body"))
                    expect(comment.hasOwnProperty("created_at"))
                    expect(comment.hasOwnProperty("article_id"))
                })
            })    

        })

        test.only('responds (404) "Not found" when article_id valid format but not present in database', () => {
                
            return request(server)
            .get('/api/articles/9999/comments')
            .expect(404)
            .then((response) => {
                expect((response.body.msg)).toBe("Not found")
            })
        })

        test('responds (400) "Bad request" when article_id not correct format', () => {
            
            return request(server)
            .get('/api/articles/articleNumber1/comments')
            .expect(400)
            .then((response) => {
                expect((response.body.msg)).toBe("Bad request")
            })
        })
    })
})





