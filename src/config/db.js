const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_DB_LOCAL);
    console.log('Connected to MongoDB');
    } catch(err) {
        console.log(err.message)
    }
}

module.exports = connect;