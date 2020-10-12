const express = require('express');
const connectdb = require('./Config/db');

const app = express();

connectdb();
const PORT = process.envPORT || 5000;

app.get('/', (req, res) => res.send('API running'));



app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));