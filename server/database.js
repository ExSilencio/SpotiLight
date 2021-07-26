const mongoose = require('mongoose');

require('dotenv').config()

const connection = process.env.dbURI;

mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
