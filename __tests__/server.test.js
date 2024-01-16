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

