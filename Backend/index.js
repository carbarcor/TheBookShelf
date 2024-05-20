const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch(() => console.log(' DB not conected'))

const app = express();

app.use(cors());
app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, async () => {
    console.log(`Server on ${port}`);
});
