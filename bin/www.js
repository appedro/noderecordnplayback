
const app = require('../app')
var http = require('http');
var port = process.env.PORT || '3000';
app.set('port', port);

const
  server = http.createServer(app),
  express = require("express"),
  fs = require('fs'),
  path = require('path'),
  io = require("socket.io")(server),
  Speaker = require('speaker'),
  Mic = require('node-microphone'),
  mic = new Mic({ rate: 44100 }), //Instancia o Mic
  newRecorder = () => {

    const speaker = new Speaker({ //Inicia o speaker
      channels: 2,
      bitDepth: 16,
      sampleRate: 44100
    }),
      micStream = mic.startRecording()

    let directoryName = 'public/record'


    // Cria um arquivo com nome aleatório
    const fileName = path.join(directoryName, Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4).concat('.wav'));


    // Cria uma writable stream
    const fileStream = fs.createWriteStream(fileName, { encoding: 'binary' });
    micStream.pipe(fileStream)
    micStream.pipe(speaker)
  }



io.on('connect', socket => {
  socket.on('record', data => {
    //Condicional com os dados do client-side
    if (data)
      newRecorder()
    else
      mic.stopRecording()
  })
})


server.listen(port);
