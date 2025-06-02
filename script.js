let recognition;
let isRecording = false;

function startRecognition() {
  if (isRecording) return;
  isRecording = true;

  recognition = new webkitSpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.trim();
    document.getElementById('userSpeech').innerText = transcript;
    compareWithScript(transcript);
  };

  recognition.onerror = function(event) {
    console.error('Error:', event.error);
    document.getElementById('feedback').innerText = "Error: " + event.error;
  };

  recognition.onend = function() {
    isRecording = false;
  };
}

function stopRecognition() {
  if (recognition && isRecording) {
    recognition.stop();
    isRecording = false;
  }
}

function compareWithScript(userText) {
  const original = document.getElementById('scriptInput').value.trim();
  const originalWords = original.split(' ');
  const userWords = userText.split(' ');

  let highlighted = '';
  for (let i = 0; i < originalWords.length; i++) {
    if (userWords[i] && userWords[i].toLowerCase() === originalWords[i].toLowerCase()) {
      highlighted += originalWords[i] + ' ';
    } else {
      highlighted += `<mark>${originalWords[i]}</mark> `;
    }
  }

  document.getElementById('feedback').innerHTML = highlighted;
}
