const server = require('../server.js')
const request = require('supertest')
const database = require("../db/connection.js")

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
