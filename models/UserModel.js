const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    role: {
      type: String,
      enum: ['junior-staff', 'senior-staff', 'senior-tech', 'admin'],
      default: 'junior-staff',
    },
  },
  {
    timestamps: true,
  }
);

// Password hash middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password compare method
/*userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};*/

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Entered:", enteredPassword);
  console.log("Stored:", this.password);

  if (!enteredPassword || !this.password) {
    throw new Error("Missing password for comparison");
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);