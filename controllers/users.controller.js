const {requestAllUsers} = require("../models/users.model")

exports.getAllUsers = (request, response, next) => {

    requestAllUsers()
    .then((users) => {        
        response.status(200).send({users})
    })

}