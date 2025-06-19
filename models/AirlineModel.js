const mongoose = require('mongoose')

const airlineSchema = mongoose.Schema(
    {
        airline_code: {
            type: String,
            required: [true, 'Add the two-letter code of an airline.']
        },
        airline_name: {
            type: String,
            required: [true, 'Add the name of the airline.']
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
  },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Airline', airlineSchema)