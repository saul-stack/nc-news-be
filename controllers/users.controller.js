const {requestAllUsers} = require("../models/users.model")

exports.getAllUsers = (request, response, next) => {

    requestAllUsers()
    .then((allUsers) => {        
        response.status(200).send(allUsers)
    })


}