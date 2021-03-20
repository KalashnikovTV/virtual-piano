const pianoКeys = document.querySelectorAll('.piano-key');
const piano = document.querySelector('.piano');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
let isClicked = false;

// Letters
btnNotes.addEventListener('click', () => {
    btnLetters.classList.remove('btn-active');
    btnNotes.classList.add('btn-active');
    pianoКeys.forEach(key => key.classList.remove('letter'));
});

btnLetters.addEventListener('click', () => {
    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');
    pianoКeys.forEach(key => key.classList.add('letter'));
});

// Mouse events and playAudio
function checkHandleMouse(e) {
    if (!isClicked) return;
    playAudio(e);
}

const removePianoKeyActive = (e) => {
    e.target.classList.remove('piano-key-active');
};

window.addEventListener('mouseup', () => (isClicked = false));

pianoКeys.forEach((key) => {
    key.addEventListener('mousedown', (e) => {
        isClicked = true;
        checkHandleMouse(e);
    });

    key.addEventListener('mouseover', checkHandleMouse);
    key.addEventListener('mouseleave', removePianoKeyActive);
    key.addEventListener('mouseup', removePianoKeyActive);
    key.addEventListener('contextmenu', (e) => e.preventDefault());
});
  
const playAudio = (e) => {
    const event = e.target;
    const audio = document.querySelector(`audio[data-note="${event.dataset.note}"]`);
    if (!audio) return;
    event.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
};

// Keyboard
let repeatSound = true;
window.addEventListener('keydown', (e) => {
    if (e.repeat != undefined) {
        repeatSound = !e.repeat;
    }
    if (!repeatSound) return;
    repeatSound = false;

    const key = document.querySelector(`.piano-key[data-letter="${e.code.slice(-1)}"]`);
    if (key) {
        const audio = document.querySelector(`audio[data-note="${key.dataset.note}"]`);
        key.classList.add('piano-key-active');
        audio.currentTime = 0;
        audio.play();
    }
});

window.addEventListener('keyup', (e) => {
    repeatSound = true;
    const key = document.querySelector(`.piano-key[data-letter="${e.code.slice(-1)}"]`);
    if (key) {
        key.classList.remove('piano-key-active');
    }
});

// Fullscreen mode
document.querySelector('.fullscreen').addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            btnOffFullScreen();
        }
    }
}

const btnOffFullScreen = () => {
    document.addEventListener("keypress", (e) => {
        if (e.key === "Escape") {
          toggleFullScreen();
        }
    }, false);
};
