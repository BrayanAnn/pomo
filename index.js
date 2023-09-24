class Config{
    steps = ["Foco", "Pausa curta", "Pausa longa"]

    constructor(countdownTime, shortBreakTime, longBreakTime) {
        this.step = 0;
        this.ant = null;
        this.countdownTime =    countdownTime;
        this.shortBreakTime =   shortBreakTime;
        this.longBreakTime =    longBreakTime;
    }
 
    setNextStep(){
        if(this.ant == null || this.ant == 2 && this.step == 0){
            this.ant = this.step;
            this.step = 1;
        }else if(this.step == 1 || this.step == 2){
            this.ant = this.step
            this.step = 0;
        }else if(this.ant == 1 && this.step == 0){
            this.ant = this.step
            this.step = 2;
        }
    }

    labelStep(){
        return this.steps[this.step];
    }
}

class Timer{
    constructor(time){
        this.time = time
        this.remainingTime = time;
        this.interval = null;
        this.audio = new Audio('song.wav')

        this.updateUI();
    }
    start() {
        this.interval = setInterval(() => {
            
            this.remainingTime -= 1;
            this.updateUI()
            if (this.remainingTime <= 0) {
                this.stop();
                this.audio.play();

                config.setNextStep()
                timer.stop();
                btnPlayPause.childNodes[1].textContent = "play_arrow"; 
                changeStep();
                timer.updateUI()
            }
        
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    pause(){
        clearInterval(this.interval);
    }

    reset() {
        this.remainingTime = this.time;
        this.updateUI();
        this.pause();
    }

    updateUI(){
        let minutesLabel = document.getElementById("minutes");
        let secondsLabel = document.getElementById("seconds");
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        minutesLabel.textContent = String(minutes).padStart(2, '0');
        secondsLabel.textContent = String(seconds).padStart(2, '0');
    }

    
}
const config = new Config(0.1 * 60, 5 * 60, 15 * 60);
var timer = new Timer(config.countdownTime);

document.addEventListener("DOMContentLoaded", (e) => {
    
    labelStep = document.getElementById("step");
    cardBox = document.getElementsByClassName("box")[0];
    console.log(cardBox[0])
    cardBox.style.backgroundColor  = "#E45A58"
    labelStep.textContent = config.labelStep();
    

    btnPlayPause = document.getElementById("box_control_play_pause");
    btnStop = document.getElementById("box_control_stop");
    btnSkipStep = document.getElementById("box_control_skip_step");

    btnPlayPause.addEventListener("click", function() {
        if (btnPlayPause.childNodes[1].textContent === "pause") {
            timer.pause();
            btnPlayPause.childNodes[1].textContent = "play_arrow"; 
        } else {
            test = timer.start();
            if(test){
                config.setNextStep();
                timer.stop();
                btnPlayPause.childNodes[1].textContent = "play_arrow";
                changeStep()
                timer.updateUI()
            }
            btnPlayPause.childNodes[1].textContent = "pause";
        }
    });

    btnStop.addEventListener("click", function(){
        timer.reset();
        timer.audio.pause();
        timer.audio.currentTime = 0;
        btnPlayPause.childNodes[1].textContent = "play_arrow"; 
    });

    btnSkipStep.addEventListener("click", function(){
        config.setNextStep()
        timer.stop();
        btnPlayPause.childNodes[1].textContent = "play_arrow"; 
        changeStep();
        timer.updateUI()
    })
})
function changeStep(){
    if(config.step == 0){
        timer = new Timer(config.countdownTime);
        timer.stop();
        labelStep.textContent = config.labelStep();
        cardBox.style.backgroundColor  = "#E45A58"
    }else if(config.step == 1){
        timer = new Timer(config.shortBreakTime);
        timer.stop();
        labelStep.textContent = config.labelStep();
        cardBox.style.backgroundColor  = "#549862"
    }else if(config.step == 2){
        timer = new Timer(config.longBreakTime);
        timer.stop();
        labelStep.textContent = config.labelStep();
        cardBox.style.backgroundColor  = "#6699CC"
    }
}