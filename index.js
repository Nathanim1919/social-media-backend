const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./Routers/userRouter.js');
const authRouter = require('./Routers/authRouter.js');
const postRouter = require('./Routers/postRouter.js');
const app = express()


// database connection
mongoose.connect('mongodb+srv://nathan:nathanim1919@cluster0.3w1trth.mongodb.net/blogPost?retryWrites=true&w=majority')
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))


// cross-origin-resource sharing middleware configuration
// so as to able to set  ['https://localhost:3000'], which means that requests from that origin will be allowed.
app.use(cors({
    origin: ['https://social-app-ukv1.onrender.com'],
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://socia-jgr7.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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