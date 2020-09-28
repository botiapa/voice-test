navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  console.log("Got mic: ", stream);

  // Get the microphone, and setup a pipeline, to process the incoming data
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(context.destination);

  let samples = [];

  // This gets called every time microphone data is available. 1024 bytes long array at 44100 HZ (Depends on settings).
  processor.onaudioprocess = function (e) {
    samples = new Float32Array([samples, ...e.inputBuffer.getChannelData(0)]); // This appends the new data, to the old array
    if (samples.length >= 1000) {
      samples = samples.slice(-1000); // Keep a buffer of a 1000 samples
      console.log(samples[999]);
    }
  };

  /* 
    THIS IS WHERE IT GETS TRANSFERRED THROUGH THE NETWORK 
  */

  // This is where it should be played back
  /*while (true) {
    console.log(samples);
    // Put the samples into a buffer, and then play them back?
  }*/
});
