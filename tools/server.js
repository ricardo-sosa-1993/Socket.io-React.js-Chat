import express from 'express';  
import webpack from 'webpack';  
import path from 'path';  
import config from '../webpack.config.dev';  
import open from 'open';  
import favicon from 'serve-favicon';
import socket from 'socket.io';
import { Server } from 'http';

/* eslint-disable no-console */

const port = 3000;  
const app = express();  
const server = Server(app);
const io = socket.listen(server);
const compiler = webpack(config);

var util = require('util')


var router = express.Router();

var nicknames = [];


var existInNicknames = function(name){
  var found = false;
  for(var i = 0; i < nicknames.length; i++) {
      if (nicknames[i].nickname == name) {
          found = true;
          break;
      }
  }
  return found;

};


router.get('/nickname/:nickname/', function(req, res) {
	var nickname = req.params.nickname;
	if(nicknames.indexOf(nickname) != -1){
		res.status(403).send('Nickname already registered');
		
	}else{
		nicknames.push(nickname);
		res.status(200).send(""+Math.floor((Math.random() * 3)));
	}

});



app.use('/', router);
app.use(express.static(path.join( __dirname, '../src')));


app.use(require('webpack-dev-middleware')(compiler, {  
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));  


io.on('connection', function(socket) {  

  socket.on('message', function(message) {
    console.log(message.message);
    io.emit('message', message);
   });


})


server.listen(port, function(err) {  
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});


