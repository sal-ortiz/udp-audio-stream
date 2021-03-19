
const Datagram = require('dgram');


class AudioClient {

  constructor(audioEngine) {
    let reuseAddr = true;

    let constr = this.constructor;
    let errorCallback = constr.sockError.bind(this);
    let outputCallback = constr.audioOutput.bind(this);
    let inputCallback = constr.sockInput.bind(this);
    let closeCallback = constr.sockDisconnect.bind(this);
    let connectionCallback = constr.sockConn.bind(this);

    let socket = Datagram.createSocket({
      type: 'udp4', reuseAddr: reuseAddr
    });

    socket.on('error', errorCallback);
    socket.on('message', inputCallback);
    socket.on('close', closeCallback);
    socket.on('connect', connectionCallback);

    audioEngine.on('data', outputCallback);

    this.socket = socket;
    this.engine = audioEngine;
  }

  connect(host, port) {
    this.socket.connect(port, host);
  }

  disconnect() {
    this.socket.close();
  }

  static audioOutput(data) {
    // NOTE: executed from within the context of a class instance.
    this.socket.send(data);
  }

  static sockInput(data, info) {
    // NOTE: executed from within the context of a class instance.
    this.engine.write(data);
  }

  static sockConn() {
    // NOTE: executed from within the context of a class instance.
  }

  static sockDisconnect() {
    // NOTE: executed from within the context of a class instance.
  }

  static sockError(err) {
    // NOTE: executed from within the context of a class instance.
  }

}


module.exports = AudioClient;
