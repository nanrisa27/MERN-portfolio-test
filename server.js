const express = require('express');
const connectdb = require('./Config/db');

const app = express();

connectdb();
const PORT = process.envPORT || 5000;

app.get('/', (req, res) => res.send('API running'));

app.use('/Api/users', require('./Routes/API/users'))
app.use('/Api/auth', require('./Routes/API/auth'))
app.use('/Api/posts', require('./Routes/API/posts'))
app.use('/Api/profile', require('./Routes/API/profiles'))



app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));