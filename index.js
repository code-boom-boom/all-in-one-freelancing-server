const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

//Routers
const userRouter = require('./routes/user-router');

const app = express();

const apiPort = 1337;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', [
    userRouter
]);

app.listen(apiPort, () => {
    console.log('Express server listening on port ' + apiPort);
});