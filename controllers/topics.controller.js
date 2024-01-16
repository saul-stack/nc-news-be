const {requestAllTopics} = require("../models/topics.model")

exports.getTopics = (request, response) => {
        
    requestAllTopics()
    .then((allTopics) => response.status(200).send(allTopics))

}
