const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser
} = require('../controllers/userController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Anyone can register and login, not associated with a user
// These are public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Only admin can get the list of all users
router.get('/users', protect, authorizeRoles('admin'), getUsers);

// This applies the protect middleware to all routes defined after this line
router.use(protect);

// This applies the authorize middleware — in this case, only allows users with the role 'admin' to proceed.
router.use(authorizeRoles('admin'));

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserRole);
router.delete('/:id', deleteUser);

module.exports = router;