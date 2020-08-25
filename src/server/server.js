import User from './src/models/user'
import mailgun from 'mailgun-js' 
const path = require('path');
const express = require('express'); 
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
// Allows you to set port in the project properties
const port = process.env.PORT || 5000;

app.use(cors());
// Allows you to parse json
app.use(express.json()) 

// Mongo setup
const uri = process.env.ATLAS_URI
try {
    mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, () =>
        console.log("DB connection established successfully")
    );
} catch(err) {
    console.log("DB connection error: " + err);
    try {
        console.log("Trying to send email to admin about error...");
        const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.MAILGUN_DOMAIN});
        const data = {
          from: 'Excited User <me@samples.mailgun.org>',
          to: 'eyalgolan96@gmail.com',
          subject: 'DB connection failed',
          html: `<h1>Hi,</h1>
            <p>DB connection failed with error:</p>
            <p>${err}</p>`
        };
        mg.messages().send(data, function (error, body) {
          console.log(body);
        });
      } catch(err) {
        console.log("Sending email failed with error: " + err);
      }
}

const userRouter = require('./src/routes/users');
app.use('/users', userRouter);

// Starts the server
app.listen(port, () => {
    console.log(User.length);
    console.log(`Server is running on port: ${port}`);
  })