let is24HourFormat = true;
let countdownDate;
let interval;

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        document.getElementById('timer').textContent = "00:00:00";
        clearInterval(interval);
        return;
    }

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let ampm = '';

    if (!is24HourFormat) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
    }

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}${ampm}`;
    document.getElementById('timer').textContent = timeString;
}

function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
}

function startTimer() {
    const timeInput = document.getElementById('timeInput').value.trim();
    const timeParts = timeInput.match(/(\d{1,2}):(\d{2}):(\d{2})\s*([aApP][mM])?/);

    if (!timeParts) {
        alert("Please enter a valid time in HH:MM:SS AM/PM format.");
        return;
    }

    let hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);
    const seconds = parseInt(timeParts[3], 10);
    const ampm = timeParts[4];

    if (ampm) {
        if (ampm.toUpperCase() === 'PM' && hours < 12) {
            hours += 12;
        } else if (ampm.toUpperCase() === 'AM' && hours === 12) {
            hours = 0;
        }
    }

    const now = new Date();
    countdownDate = new Date(now.getTime() + hours * 3600000 + minutes * 60000 + seconds * 1000);

    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
    updateTimer();
    document.getElementById('timeInput').value = '';
}

document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('toggleTimeFormat').addEventListener('click', toggleTimeFormat);
