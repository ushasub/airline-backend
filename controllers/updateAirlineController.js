const Airline = require('../models/AirlineDepArrModel');

const updateAirline = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Airline.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    console.log("Updated.")
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating airline' });
  }
};

module.exports = { updateAirline };