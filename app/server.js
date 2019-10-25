const express = require('express');
const mongoose = require('mongoose');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const auth = require('./routes/auth');
const home = require('./routes/api/home');

const { port, mongoURI } = require('./config');
const socketHandler = require('./utils/socket');
const authentificator = require('./utils/authentificator');

app.use(express.static(__dirname + '/public'));
app.use(express.json({ limit: '11mb' }));
app.use(express.urlencoded({ limit: '11mb', extended: true }));

app.get(/.*/, (req, res) => res.send('index.html'));
app.use('/auth', auth);
app.use('/api', authentificator);
app.use('/api/home', home);

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

io.on('connection', socketHandler);

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to mongoDB!');
    server.listen(port, () => console.log(`Up on port:${port}`));
  })
  .catch(e => console.log(e));

