const mongoose = require('mongoose');

const connectToDatabase = async () => {
  mongoose.set('strictQuery', false);
  try {
    let conn = await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch(error) {
    console.log(`Error: Could not connect to database: ${process.env.DATABASE}`);
    console.log(error);
  }
}

module.exports = connectToDatabase;