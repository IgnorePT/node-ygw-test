var audio;
var id_input;

function getAudioElement(id){
    audio = document.querySelector('#audio'+ id);
    return audio;
} 

function captureMicrophone(callback) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, callback, function(error) {
        alert('Unable to access your microphone.');
        console.error(error);
    });
}

function stopRecordingCallback() {
   document.getElementById('btn-pause-recording'+ id_input).removeAttribute("disabled");
    var blob = recorder.getBlob();
    audio.src = URL.createObjectURL(blob);
    audio.play();
    recorder.microphone.stop();

    var reader = new window.FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
                base64data = reader.result;                
                resultbase64 = base64data.split(',')[1];
                $('input[data-id = "'+id_input+'"]').attr('data-audio', resultbase64);
  }
}

var recorder;

function startRecordingYGW(id){

    id_input = id;
    getAudioElement(id);

    document.getElementById('btn-start-recording'+id).setAttribute("disabled","true");

    console.log("audio[id]");
    console.log(audio);

    captureMicrophone(function(microphone) {
        audio.src = URL.createObjectURL(microphone);
        audio.play();
        recorder = RecordRTC(microphone, {
            type: 'audio',
            recorderType: StereoAudioRecorder,
            desiredSampRate: 16000
        });

        var recordingDuration = 20000;
        recorder.setRecordingDuration(recordingDuration).onRecordingStopped(stopRecordingCallback);
        recorder.startRecording();
        // release microphone on stopRecording
        recorder.microphone = microphone;

        document.getElementById('btn-stop-recording'+ id).removeAttribute("disabled");
        document.getElementById('btn-pause-recording' + id).removeAttribute("disabled");
    });
}

function stopRecordingYGW(id){
    document.getElementById('btn-stop-recording'+id).setAttribute("disabled","true");
    recorder.stopRecording(stopRecordingCallback);
}

function restartRecordingYGW(id){

        document.getElementById('btn-pause-recording'+ id).setAttribute("disabled","true");
        captureMicrophone(function(microphone) {
        audio.src = URL.createObjectURL(microphone);
        audio.play();
        recorder = RecordRTC(microphone, {
            type: 'audio',
            recorderType: StereoAudioRecorder,
            desiredSampRate: 16000
        });

        var recordingDuration = 20000;
        recorder.setRecordingDuration(recordingDuration).onRecordingStopped(stopRecordingCallback);
        recorder.startRecording();
        // release microphone on stopRecording
        recorder.microphone = microphone;

        document.getElementById('btn-stop-recording'+ id).removeAttribute("disabled");
    });
}


