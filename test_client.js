
const Path = require('path');
const PortAudio = require('naudiodon');

const libPath = Path.join(__dirname, 'lib');
const Client = require(Path.join(libPath, 'client.js'));

//console.log(PortAudio.getDevices());
//console.log(PortAudio.getHostAPIs());

const inpEngine = new PortAudio.AudioIO({
  inOptions: {
    channelCount: 2,
    sampleFormat: PortAudio.SampleFormat16Bit,
    sampleRate: 22000,
    sampleFormat: PortAudio.SampleFormat16Bit,

    deviceId: -1,
    //closeOnError: false,

    highWaterMark: 1024,
    framesPerBuffer: 16,
  },

});


const client = new Client(inpEngine);

process.on('exit', client.disconnect.bind(client)); // cleanup

process.on('SIGINT', process.exit.bind(process));   // exit
process.on('SIGUSR1', process.exit.bind(process));  // exit
process.on('SIGUSR2', process.exit.bind(process));  // exit


const host = process.argv[2].toString();  // '0.0.0.0';
const port = parseInt(process.argv[3]);   // 29577;

client.connect(host, port);
