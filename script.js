const textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechBtn = document.querySelector('.submit');

let synth = speechSynthesis
let isSpeaking = true

function voiceSpeech() {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name
        voiceList.add(option);
        console.log(option)
    }
}

synth.addEventListener('voiceschanged', voiceSpeech)

function texttoSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance);
}

speechBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (textarea.value !== '') {
        if (!synth.speaking) {
            texttoSpeech(textarea.value)
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume()
                isSpeaking = false
                speechBtn.innerHTML = 'Pause Speech'
            } else {
                synth.pause()
                isSpeaking = true
                speechBtn.innerHTML = 'Resume Speech'
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerHTML = 'Convert To Speech'
                }
            })
        } else {
            speechBtn.innerHTML = 'Convert To Speech'
        }
    }
})