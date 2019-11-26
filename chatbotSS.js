// This code is in charge of speach synthesizer API

export default function speak(message) {
    var timer = setInterval(function () {
        var voices = speechSynthesis.getVoices();
        // console.log(voices);
        if (voices.length !== 0) {
            let msg = new SpeechSynthesisUtterance(message);
            msg.voice = voices[5];
            speechSynthesis.speak(msg);
            clearInterval(timer);
        }
    }, 200);
}