const Datagram = require('dgram');
const Path = require('path');

const Identifier = require(Path.join(__dirname, 'identifier.js'));


class AudioServer {

  constructor(audioEngine) {
    let reuseAddr = true;

    let errorCallback = constr.sockError.bind(this, sockId);
    let listeningCallback = constr.sockListenting.bind(this);
    let inputCallback = constr.sockInput.bind(this);
    let closeCallback = consr.sockDisconnect.bind(this);
    let connectionCallback = constr.sockConn.bind(this);

    let socket = Datagram.createSocket({type: 'udp4', reuseAddr: reuseAddr });

    socket.on('listening', listeningCallback);
    socket.on('error', errorCallback);
    socket.on('message', inputCallback);
    socket.on('close', closeCallback);
    socket.on('connect', connectionCallback);

    this.socket = socket;
    this.engine = audioEngine;
  }

  start(address, port) {
    socket.bind(port, address);
  }

  stop() {
   this.socket.close();
  }

  static sockInput(data, info) {
    // NOTE: executed from within the context of a class instance.
    this.engine.write(data);
  }

  static sockConn() {
    // NOTE: executed from within the context of a class instance.
  }

  static sockListenting() {
    // NOTE: executed from within the context of a class instance.
  }

  static socketDisconnect() {
    // NOTE: executed from within the context of a class instance.
  }

  static sockError() {
    // NOTE: executed from within the context of a class instance.
  }

}


module.exports = AudioServer;
