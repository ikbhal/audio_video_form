
var stream;
var recorder;

function uploadFile(blob) {
    data = new FormData();
    data.append('file', blob);

    $.ajax({
        url: "/video",
        type: "POST",
        data: data,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: function(data) {
            document.getElementById("result").innerHTML = 'Result: Upload successful';
        },
        error: function(e) {
            document.getElementById("result").innerHTML = 'Result: Error occurred: ' + e.message;
        }
    });
}
async function recordVideo() {
    stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    recorder.startRecording();
}
async function stopRecordingVideo(){
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    await uploadFile(blob);
}

//record_video();
$(document).ready(function(){
    $("#record_button").click(recordVideo);

    $("#stop_record_button").click(stopRecordingVideo);
});
