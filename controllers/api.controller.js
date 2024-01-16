const {requestAllEndpoints} = require("../models/api.model")

exports.getEndpoints = (request, response) => {
        
    requestAllEndpoints()
    .then((allEndpoints) => {

    response.status(200).send(allEndpoints)
    })

}

