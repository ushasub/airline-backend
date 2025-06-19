const express = require('express');
const router = express.Router();
const { addAirlines } = require('../controllers/addController');
const { getAllAirlines } = require('../controllers/getAirlinesController');
const { updateAirline } = require('../controllers/updateAirlineController');
const { deleteAirline } = require('../controllers/deleteAirlineController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Route to trigger reading from a file in the local file system
// Only senior, senior-tech, and admin can upload

// View all airlines – All organizational authenticated users
// Not allowed for users who are customers
router.get('/', protect, getAllAirlines);

// Upload airlines – Only authorized users - senior-staff, senior-tech and admin
router.post('/add', protect, authorizeRoles('senior-staff','senior-tech', 'admin'), addAirlines);

// Update airline – Only authorized users - senior-tech and admin
router.put('/:id', protect, authorizeRoles('senior-tech', 'admin'), updateAirline);

// Delete airline – admin only
router.delete('/:id', protect, authorizeRoles('admin'), deleteAirline);

module.exports = router;