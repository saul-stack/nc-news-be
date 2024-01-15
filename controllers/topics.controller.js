const {requestAllTopics} = require("../models/topics.model")

exports.getTopics = (request, response) => {
    
    // // invoke the model function and send its response 
    
    requestAllTopics()
    .then((allTopics) => response.status(200).send(allTopics))

}
