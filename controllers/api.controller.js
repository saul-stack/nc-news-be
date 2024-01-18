const {requestAllEndpoints} = require("../models/api.model")

exports.getAllEndpoints = (request, response) => {
        
    requestAllEndpoints()
    .then((allEndpoints) => {
    response.status(200).send({endpoints: allEndpoints})
    })

}

