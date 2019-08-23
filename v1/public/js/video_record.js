
var fileData = null;

function loadFile() {
    var preview = document.querySelector('file');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
        fileData = file;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}

function uploadFile(blob) {
    data = new FormData();
    data.append('file', blob);

    $.ajax({
        url: "http://localhost:8081/post_pdf/",
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
async function record_video() {
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    let recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    recorder.startRecording();

    const sleep = m => new Promise(r => setTimeout(r, m));
    await sleep(3000);

    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    //invokeSaveAsDialog(blob);
    await uploadFile(blob);
}

record_video();