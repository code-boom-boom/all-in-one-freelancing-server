const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiPort = 1337;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(apiPort, () => {
    console.log('Express server listening on port ' + apiPort);
});