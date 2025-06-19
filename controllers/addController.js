const fs = require('fs');
const csv = require('csv-parser');
const AirlineDepArr = require('../models/AirlineDepArrModel');

const addAirlines = async (req, res) => {
  const results = [];

  if (!fs.existsSync('./assets/AirlineDepArrDataFS.csv')) {
    console.error('ERROR: File not found.');
    return res.status(404).json({ error: 'CSV file not found.' });
  }

  try {
    console.log('File exists. Starting read stream...');
    const stream = fs.createReadStream('./assets/AirlineDepArrDataFS.csv')
      .on('error', (err) => {
        console.error('ERROR: Error while reading file:', err.message);
        return res.status(500).json({ error: 'Error reading the CSV file.' });
      })
      .pipe(csv());

    stream.on('data', (row) => {
      console.log('Number of rows:', row);
      results.push(row);
    });


    stream.on('end', async () => {
      console.log(`Upload triggered by: ${req.user.name} (${req.user.role})`);
      console.log(`Finished reading the file. Total rows read: ${results.length}`);
      try {
        const inserted = await AirlineDepArr.insertMany(results);
        console.log(`SUCCESS: Inserted ${inserted.length} records into MongoDB database.`);
        res.status(200).json({ message: `Inserted ${inserted.length} records.` });
      } catch (err) {
        console.error('ERROR: MongoDB insert failed:', err.message);
        res.status(500).json({ error: 'Database insert failed.' });
      }
    });
  }
  catch (err) {
    console.error('ERROR: Unexpected error:', err.message);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
};

module.exports = { addAirlines };