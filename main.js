document.addEventListener("DOMContentLoaded", function() {
    const speakButton = document.getElementById('speakBtn');
    const copyButton = document.getElementById('copyTextBtn');
    const clearButton = document.getElementById('clearTextBtn');
    const languageSelect = document.getElementById('languageSelect');
    const textArea = document.querySelector('.voiceRecognitionTextarea');

    let text = '';

    speakButton.addEventListener('click', function() {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.lang = languageSelect.value;
      
      recognition.onresult = function(event) {
        text += event.results[0][0].transcript + ' ';
        textArea.value = text;
      };
      
      recognition.start();
    });

    copyButton.addEventListener('click', function() {
      navigator.clipboard.writeText(text).then(() => {
        alert("Text copied to clipboard!");
      }, (err) => {
        console.error('Async: Could not copy text: ', err);
      });
    });

    clearButton.addEventListener('click', function() {
      text = '';
      textArea.value = '';
    });
  });
