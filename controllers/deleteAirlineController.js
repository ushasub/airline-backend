const Airline = require('../models/AirlineDepArrModel');

const deleteAirline = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Airline.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    console.log("Deleted.")
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting airline' });
  }
};

module.exports = { deleteAirline };