const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bragboard', 
    {
        useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true, //get rid of deprication warning
        useFindAndModify: false
    }
);

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function() {  //.on an event listener for connection to the db
console.log(`Connected to MongoDB at ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;