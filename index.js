const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./Routers/userRouter.js');
const authRouter = require('./Routers/authRouter.js');
const postRouter = require('./Routers/postRouter.js');
const app = express()


// database connection
mongoose.connect('mongodb://127.0.0.1:27017/BlogPost')
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))

// cross-origin-resource sharing middleware configuration
// so as to able to set  ['https://localhost:3000'], which means that requests from that origin will be allowed.
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000
}));

app.use(bodyParser.json());
app.use(express.json());

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);


app.listen('5000',
    () => console.log('listening to port 5000'));