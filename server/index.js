/* eslint-disable no-unused-expressions */
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cors = require('cors');
const mongoose = require('mongoose');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);

let Text = require('./text.model');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(pino);

// app.options('/getTexts', cors());

//Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/texts', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

/**
 * getTexts
 * Retrieve texts from MongoDB
 * GET
 */
app.get('/getTexts', (req, res) => {
    Text.find(function (err, text) {
        if (err) {
            console.log(err);
        } else {
            res.json(text);
        }
    });
});

/**
 * getTexts:id
 * Retrieve specific texts from MongoDB
 * GET
 */
app.get('/getTexts:id', (req, res) => {
    let id = req.params.id;
    Text.findById(id, function (err, text) {
        if (err) {
            console.log(err);
        } else {
            res.json(text);
        }
    });
});

/**
 * sendTexts
 * Send texts from Twilio number with message
 * POST
 */
app.post('/sendText', (req, res) => {
    // console.log(req.body);
    // console.log(typeof req.body);

    client.messages
        .create({
            body: req.body.message,
            from: sendingNumber,
            to: req.body.phoneNumber
        })
        .then(function() {
            message => console.log(message.sid);
        })
        .then(function() {
            let text = new Text(req.body);
            text.save()
                .then(text => {
                    res.status(200).json({ 'text': 'text added successfully after send' });
                })
                .catch(err => {
                    res.status(400).send('adding new text after sending failed');
                });
        })
        .catch(err => {
            res.status(400).send('unable to send text through twilio');
        });
});

/**
 * storeTexts
 * Store texts received from webhook to MongoDB server
 * POST
 */
app.post('/storeTexts', (req, res) => {
    // console.log(JSON.stringify(req.body));
    // console.log(JSON.parse(JSON.stringify(req.body)).Body);
    const data = JSON.parse(JSON.stringify(req.body));
    const incomingText = {
        isSent: false,
        isReceived: true,
        name: data.FromCity,
        phoneNumber: data.From,
        message: data.Body
    };
    let text = new Text(incomingText);
    text.save()
        .then(text => {
            res.status(200).json({ 'text': 'text added successfully after receiving' });
        })
        .catch(err => {
            res.status(400).send('adding newly received text failed');
        });
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);