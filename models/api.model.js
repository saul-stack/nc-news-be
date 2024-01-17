const database = require("../db/connection")
const fs = require("fs/promises")

exports.requestAllEndpoints = () => {

    return fs.readFile('endpoints.json', 'utf-8')

    .then((fileData) => {
        const parsedData = (JSON.parse(fileData))
        return parsedData
    })
    
    .catch((err)=> {

        next(err)
    })
    
}
