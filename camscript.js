document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('video');
    const startMonitoringBtn = document.getElementById('start-monitoring-btn');
    const stopMonitoringBtn = document.getElementById('stop-monitoring-btn');
    const timerDisplay = document.getElementById('timer');
    const elapsedTimeDisplay = document.getElementById('elapsed-time');
    const homeBtn = document.getElementById('home-btn');
    const modal = document.getElementById('modal');
    const agreeCheckbox = document.getElementById('agree-checkbox');
    const agreeBtn = document.getElementById('agree-btn');

    let isMonitoring = false;
    let startTime;
    let timerInterval;

    startMonitoringBtn.addEventListener('click', () => {
        if (!isMonitoring) {
            modal.style.display = 'flex';
        }
    });

    agreeBtn.addEventListener('click', () => {
        modal.style.display = 'none';

        if (!isMonitoring && agreeCheckbox.checked) {
            startMonitoring();
        }
    });

    stopMonitoringBtn.addEventListener('click', () => {
        if (isMonitoring) {
            stopMonitoring();
        }
    });

    homeBtn.addEventListener('click', redirectToHome);

    function startMonitoring() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                isMonitoring = true;
                startMonitoringBtn.textContent = 'Stop Monitoring';
                startTime = new Date();

                // Start the timer
                updateTimer();

                // Show alert after 10 seconds
                setTimeout(() => {
                    alert("You've been monitoring for 10 seconds!");
                }, 10000);
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
            });
    }

    function stopMonitoring() {
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());

        video.srcObject = null;
        isMonitoring = false;
        startMonitoringBtn.textContent = 'Start Monitoring';

        // Show the elapsed time
        const elapsedTime = calculateElapsedTime(startTime);
        elapsedTimeDisplay.textContent = `Video Monitored: ${formatTime(elapsedTime)}`;
        elapsedTimeDisplay.style.display = 'block';

        // Reset the timer
        timerDisplay.textContent = '00:00';

        // Stop the timer interval
        clearInterval(timerInterval);
    }

    function updateTimer() {
        timerInterval = setInterval(() => {
            if (isMonitoring) {
                const elapsedTime = calculateElapsedTime(startTime);
                timerDisplay.textContent = formatTime(elapsedTime);
            }
        }, 1000);
    }

    function calculateElapsedTime(startTime) {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        return elapsedTime;
    }

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    function redirectToHome() {
        window.location.href = 'front.html';
    }
});
