const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        const pwd = encodeURIComponent('rajendiran@8124')
        const connectionString = `mongodb+srv://sundar_yubi:${pwd}@cluster0.mspifm2.mongodb.net/mycontacts-backend?retryWrites=true&w=majority`
        const connect = await mongoose.connect(connectionString);
        console.log('db connected', connect.connection.host, connect.connection.name);
    }
    catch (err){
        console.log(err)
        process.exit(1);
    }
};

module.exports = connectDb;