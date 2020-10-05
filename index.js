
const Path = require('path');

const libPath = Path.join(__dirname, 'lib');
const StreamServer = require(Path.join(libPath, 'server.js'));
const StreamClient = require(Path.join(libPath, 'client.js'));


class NetAudioStreamer {

  static get Server() {
    return StreamServer;
  }

  static get Client() {
    return StreamClient;
  }

}


module.exports = NetAudioStreamer;
