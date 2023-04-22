const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apicache = require('apicache');
const userRouter = require('./Routers/userRouter.js');
const authRouter = require('./Routers/authRouter.js');
const postRouter = require('./Routers/postRouter.js');
const app = express()


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/BlogPost', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => console.log('connected'))
.catch((err) => console.log(err))
// mongoose.connect('mongodb+srv://nathan:nathanim1919@cluster0.3w1trth.mongodb.net/blogPost?retryWrites=true&w=majority')


// cross-origin-resource sharing middleware configuration
// so as to able to set  ['https://localhost:3000'], which means that requests from that origin will be allowed.
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
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


// Socket.IO code
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});


app.listen('5000',
    () => console.log('listening to port 5000'));