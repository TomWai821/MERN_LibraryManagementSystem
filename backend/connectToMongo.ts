import mongoose from 'mongoose'

const mongooseURI:string = "mongodb://localhost:27017";

const connectToMongoDB = () => 
{
    mongoose.connect(mongooseURI);
}

module.exports = connectToMongoDB;