const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);
app.listen(PORT, function() {
    console.log('Сервер запущен, порт: ' + PORT);
});
