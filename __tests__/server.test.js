const server = require('../server.js')
const request = require('supertest')
const database = require("../db/connection.js")

//close the connection to the database 
afterAll(() => database.end())

describe('/api/topics', () => {

    describe('GET /api/topics', () => {

        //responds with correct status code
        test('status 200', () => {
            return request(server)
            .get('/api/topics')
            .expect(200)
        })

        //responds with array
        test('responds with an array', () => {
            return request(server)
            .get('/api/topics')
            .then((response) => {
                expect(Array.isArray(response.body)).toBe(true)
            })
        })

        //array contains objects with correct properties
        test('response array contains objects with expected properties', () => {
            return request(server)
            .get('/api/topics')
            .then((response) => {

                //check each element for presence of expected property
                for (let entry of response.body) {
                    expect(entry.hasOwnProperty('slug')).toBe(true)
                    expect(entry.hasOwnProperty('description')).toBe(true)
                }
        
            })
        })

    })
    
})