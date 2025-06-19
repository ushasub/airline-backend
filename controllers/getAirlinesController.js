/*const Airline = require('../models/AirlineDepArrModel');

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find({});
    console.log("Fetched airlines:", airlines);
    res.json(airlines);
  } catch (error) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ message: 'Error retrieving airlines' });
  }
};

module.exports = { getAllAirlines };*/

const AirlineDepArr = require("../models/AirlineDepArrModel");

exports.getAllAirlines = async (req, res) => {
  try {
    const airlines = await AirlineDepArr.find().limit(10); // add limit for quick test
    console.log("Fetched airlines:", airlines);
    res.status(200).json(airlines);
  } catch (err) {
    console.error("Error fetching airlines:", err.message);
    res.status(500).json({ message: "Failed to fetch airlines" });
  }
};