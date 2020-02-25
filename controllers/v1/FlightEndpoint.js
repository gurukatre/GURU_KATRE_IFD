const { mongo } = models = require('../../db/models');
const { Flight_Schema } = mongo;

const httpCodes = require('../../lib/http-codes')

module.exports = class ProfileEndpoint {
    constructor() { }

    postFlight(req, res) {
        Flight_Schema.findOneOrCreate(req.body, req.body, (err, flight) => {
            return res.status(((flight.created) ? httpCodes.OK : httpCodes.CONFLICT)).json({
                "success": flight.created,
                "profile": flight
            });
        });
    }
}