const mongoose = require('mongoose')

const airlineDepArrSchema = new mongoose.Schema(
    {   
        year: Number,
        quarter: Number,
        month: Number,
        dayMonth: Number,
        dayWeek: Number,
        reportingAirline: String,
        flightNumber: Number,
        airlineOriginCode: String,
        originStateCode: String,
        airlineDestCode: String,
        destStateCode: String,
        plannedDepTime: Number,
        actualDepTime: Number,
        plannedArrTime: Number,
        actualArrTime: Number
    },
    { timestamps: true }
);

const AirlineDepArr = mongoose.model('AirlineDepArr', airlineDepArrSchema,'AirlineDepArr');
module.exports = AirlineDepArr;