require('dotenv').config();
const express = require('express');

const path = require('path');
const cors = require('cors');
const errorHandler = require("./config/error");
const fileUpload = require('express-fileupload');
const userRoutes = require("./server/routes/user.routes")
const connectDB = require('./database/db');

const app = express();

// Connect to MongoDB
connectDB();

// MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.status(200).json({status: 200, message: "System is healthy"})
});

app.use('/api/v1/users', userRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });

  app.use((err, req, res, _next) => {
    res.status(err.status || 500).json({
      error: {
        message: err.message
      }
    });
  });

const { lookup } = require('dns').promises;
const os = require('os');

const PORT = process.env.PORT || 2300;
app.enable('trust proxy');
// eslint-disable-next-line no-unused-vars
app.listen(PORT, async (req, res) => {
    const IP = (await lookup(os.hostname())).address;
    // await db['postgres'].sync()
    console.log(`Server started at ${process.env.NODE_ENV ==='development' ? 'http' : 'https'}://${IP}:${PORT}`);
})

module.exports = app;