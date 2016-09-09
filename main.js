var main = function(){
    var timerTimeout, timer, questions, timeSec, currentQuestion = 0, isRunning = false;
    function startTimer(duration, questions) {
        isRunning = true;
        var delay = 1000, minutes, seconds;
        timer = duration;

        var questionDelay = Math.floor(timeSec / questions) * 1000;

        function updateTimer(){
            var startTime = new Date().getTime();
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            $('#time').text(minutes + ":" + seconds);
            console.log(minutes + ":" + seconds);

            if( timer%(questionDelay/1000)===0 && currentQuestion<questions){
                currentQuestion++;
                console.log("<<++>>");
                console.log("currentQuestion: "+currentQuestion);
                console.log("timer: "+timer);
                console.log("delay: "+ questionDelay/1000);
                console.log("<>");
                $('#questionNumber').text(currentQuestion);
            }
            var execTime = new Date().getTime();
            delay = execTime - startTime;
            startTime = execTime;
            //console.log("Delay: "+delay);
            timerTimeout = setTimeout(updateTimer, 1000-delay);
            if (--timer < 0) {
                console.log("Done");
                clearTimeout(timerTimeout);
            }
        }
        updateTimer();
    }

    var submitForm = function(){
        if($('#inputTime').val()!="" && $('#inputQuestions').val()!=""){
            timeSec = $('#inputTime').val() * 60;
            questions = $('#inputQuestions').val();
            $('#inputForm').toggle();
            $('#timerContainer').toggle();
            startTimer(timeSec, questions);
        }
        else {
            //Complete form alert
        }
    };

    $('#inputForm').submit(function(e){
        e.preventDefault();
        submitForm();
    });

    $('#pause').click(function(){
        if(isRunning===true){
            isRunning = false;
            pauseTime = timer;
            clearTimeout(timerTimeout);
            console.log('<<Paused>>');
        }
        else{
            if(timer>0){
                console.log("<<Start>>");
                console.log("Time: "+pauseTime);
                console.log("questions: "+questions);
                console.log("currentQuestion: "+currentQuestion);
                console.log("<>");
                startTimer(pauseTime, questions);
            }
        }

    });

    $('#reset').click(function(){
        console.log("<<RESET>>");
        clearTimeout(timerTimeout);
        if(isRunning===true){
            currentQuestion = 0;
            startTimer(timeSec, questions);
        }
        else {
            clearTimeout(timerTimeout);
            currentQuestion = 0;
            $('#questionNumber').text('1');
            pauseTime = timeSec;
            var tempMinutes = parseInt(timeSec / 60, 10);
            var tempSeconds = parseInt(timeSec % 60, 10);

            tempMinutes = tempMinutes < 10 ? "0" + tempMinutes : tempMinutes;
            tempSeconds = tempSeconds < 10 ? "0" + tempSeconds : tempSeconds;

            $('#time').text(tempMinutes + ":" + tempSeconds);

            isRunning = false;
        }
        console.log("<>");
    });

    $('#cancel').click(function(){
        clearTimeout(timerTimeout);
        currentQuestion = 0;
        $('#timerContainer').toggle();
        $('#inputForm').toggle();
    });


};

$(document).ready(main);
