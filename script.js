let completeBlob = null
let recorder = null
let chunks = [];
let stream = null
async function startRecord() {
    try {

        stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen'
            },
        })
        recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.start();
        recorder.onstop = onstop
        document.getElementById("startBtn").style.display = "none"
        document.getElementById("stopBtn").style.display = "unset";
    } catch (error) {
        window.alert(error)
    }
}

async function stopScreen() {
    recorder.stop()
    document.getElementById("stopBtn").style.display = "none";
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
}

function onstop() {
    completeBlob = new Blob(chunks, {
        type: chunks[0].type
    });
    let downloadButton = document.getElementById('downloadbtn');
    let video = document.getElementById('videoResult');
    video.style.display = 'block'
    video.src = URL.createObjectURL(completeBlob);
    downloadButton.style.display  = 'unset'
    downloadButton.href = URL.createObjectURL(completeBlob);
    downloadButton.download = Date.now() + '.mp4';
}

