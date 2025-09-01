const startEl = document.getElementById("start")
const endEl = document.getElementById("stop")
const resetEl = document.getElementById("reset")
const timerEl = document.getElementById("timer")

let interval;
let timeLeft = 60;
let workFlg = 1;

const alarmSound = new Audio("alarm.mp3");
alarmSound.load();

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    
    timerEl.innerHTML = formattedTime;
}

function startTimer(){
    clearInterval(interval);
    endTime = Date.now() + timeLeft * 1000;

    interval = setInterval(() => {
        let now = Date.now();
        timeLeft = Math.round((endTime - now) / 1000);

        if(timeLeft <= 0){
            clearInterval(interval);

            alarmSound.currentTime = 0;
            alarmSound.play().catch(err => console.log("Play audio failed: ", err));

            if(workFlg === 1){
                workFlg = 0;
                timeLeft = 300;
            }else{
                workFlg = 1;
                timeLeft = 1500;
            }
            updateTimer();
            //startTimer();
        }else{
            updateTimer();
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

startEl.addEventListener("click", () => {
    alarmSound.play().then(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }).catch(() => {});
    startTimer();
});
endEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);