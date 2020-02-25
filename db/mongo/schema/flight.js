var mongoose = require('mongoose');
var uuid = require('node-uuid');
var Schema = mongoose.Schema;

var flightSchema = new Schema({
    _id: {
        type: String, default: function genUUID() {
            return uuid.v1()
        }
    },
    flightCode: String,
    flightProvider: String,
    sourcePortName: String,
    sourcePortCode: String,
    destinationPortName: String,
    destinationPortCode: String,
    scheduledArrival: String,
    scheduledDeparture: String,
    status: {
        type: String,
        enum: ['LANDED', 'ON SCHEDULE', 'DELAYED'],
        default: 'ON SCHEDULE'
    },
    created_at: Date,
    updated_at: Date
}, { versionKey: false });

flightSchema.statics.findOneOrCreate = function (condition, doc, callback) {
    const self = this;
    self.findOne(condition, '-_id', (err, result) => {
        return result
            ? callback(err, { created: false, ...result.toObject() })
            : self.create(doc, (err, result) => {
                return callback(err, { created: true, ...result.toObject() });
            });
    });
};

module.exports = mongoose.model('Flight_Schema', flightSchema);