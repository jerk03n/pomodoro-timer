const startEl = document.getElementById("start")
const endEl = document.getElementById("stop")
const resetEl = document.getElementById("reset")
const timerEl = document.getElementById("timer")

let interval;
let timeLeft = 60;

let workFlg = 1;

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
            if(workFlg === 1){
                notifyUser("Work session over! Take a break :)");
                workFlg = 0;
                timeLeft = 300;
            }else{
                notifyUser("Break over! Go back to work >:)");
                workFlg = 1;
                timeLeft = 1500;
            }
            updateTimer();
            startTimer();
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

function notifyUser(message){
    const audio = new Audio("alarm.mp3");
    audio.preload = "auto";
    audio.play().catch(error => console.log("Play sound failed: ", error));

    if(Notification.permission === "granted"){
        new Notification(message);
    }else if(Notification.permission !== "denied"){
        Notification.requestPermission().then(permission => {
            if(permission === "granted"){
                new Notification(message);
            }
        });
    }
}

startEl.addEventListener("click", startTimer);
endEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);