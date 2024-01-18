const {requestAllTopics} = require("../models/topics.model")

exports.getAllTopics = (request, response, next) => {
        
    requestAllTopics()
    .then((allTopics) => response.status(200).send(allTopics))

    .catch((err) => {
        next(err)
    })

}
