require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log("Database Connected");
})

const routes = require('./src/routes/routes')
app.use(express.json());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}),
)

app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server started at http://localhost:${3000}/`)
})