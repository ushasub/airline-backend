const mongoose = require('mongoose');

// Important note: The following characters must be percent encoded
// If used in the password of your MongoDB database
// : / ? # [ ] @ ! $ & ' ( ) * , ; = %

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1)
    }
}

module.exports = connectDB