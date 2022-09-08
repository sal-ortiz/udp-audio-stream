
const PortAudio = require('naudiodon');

const AudioStream = require("./index.js");


process.on('SIGINT', process.exit.bind(process));   // exit
process.on('SIGUSR1', process.exit.bind(process));  // exit
process.on('SIGUSR2', process.exit.bind(process));  // exit

const action = process.argv[2];
const host = process.argv[3].toString();  // '0.0.0.0';
const port = parseInt(process.argv[4]);   // 29577;

if (action.toUpperCase() == "START") {

  const outpEngine = new PortAudio.AudioIO({
    outOptions: {
      channelCount: 2,
      sampleFormat: PortAudio.SampleFormat16Bit,
      sampleRate: 22000,
      deviceId: -1, // default device.
      closeOnError: false,

      highWaterMark: 1024,
      framesPerBuffer: 16,
    }
  });

  const server = new AudioStream.Server(outpEngine);

  server.start(host, port);

} else if (action.toUpperCase() == "CONNECT") {

  const inpEngine = new PortAudio.AudioIO({
    inOptions: {
      channelCount: 2,
      sampleFormat: PortAudio.SampleFormat16Bit,
      sampleRate: 22000,
      deviceId: -1, // default device

      highWaterMark: 1024,
      framesPerBuffer: 16,
    }
  });

  const client = new AudioStream.Client(inpEngine);

  client.connect(host, port);
}

