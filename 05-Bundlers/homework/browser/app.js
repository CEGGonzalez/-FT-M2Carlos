//Common JS
// const whitheboard = require('./whitheboard');
// const io = require ('socket.io-client');

//ES6
  import {whiteboard} from './whitheboard';
  import io from 'socket.io-client';

  let socket = io(window.location.origin);

  socket.on("connect", function () {
    console.log("Connected!");
  });

  socket.on("load", function (strokes) {
    strokes.forEach(function (stroke) {
     let start = stroke.start;
     let end = stroke.end;
     let color = stroke.color;
      whiteboard.draw(start, end, color, false);
    });
  });

  socket.on("draw", function (start, end, color) {
    whiteboard.draw(start, end, color, false);
  });

  whiteboard.on("draw", function (start, end, color) {
    socket.emit("draw", start, end, color);
  });

