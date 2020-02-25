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

    putFlight(req, res) {
        const __query = req.body.query;
        const __data = req.body.data;
        Flight_Schema.findOneAndUpdate(__query, __data, {upsert: true}, function(err, flight) {
            if(err) return res.status(httpCodes.NOTFOUND).json({err});
            return res.status(httpCodes.OK).json({flight});
        });
        
    }
    
    getFlight(req, res) {
        Flight_Schema.find(req.body, (err, flight) => {
            if(err) return res.status(httpCodes.NOTFOUND).json({err});
            return res.status(httpCodes.OK).json({flight});
        });
    }
    
    deleteFlight(req, res) {
        Flight_Schema.remove(req.body, function(err) {
            if(err) return res.status(httpCodes.NOTFOUND).json({err});
            return res.status(httpCodes.OK).json({success: true});
        });
    }
}