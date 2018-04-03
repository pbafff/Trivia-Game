var url = "https://opentdb.com/api.php";
var ticker;
var tickerTwo;
var iterator = 0;
var correct = 0;
var wrong = 0;
var clickBool = true;
var questionTimer;
$("#modal-btn").on("click", function () {
    console.log("clicked");
    url += "?" + $.param({
        'amount': $("#no-of-questions").val(),
        'difficulty': $("#difficulty-select").val(),
        'type': 'multiple',
        'category': $("#category-select").val(),


    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (response) {
        console.log(response);
        setTimeout(() => {
            $(".modal").toggle();
            $("#game-div").toggle();
        }, 1500);
        function questionGenerator() {
            $("#question").html(response.results[iterator].question);
            console.log(response.results[iterator].correct_answer);
            console.log(iterator);
            var ansArr = [];
            var randomizedArr = [];
            ansArr.push(response.results[iterator].incorrect_answers[0], response.results[iterator].incorrect_answers[1], response.results[iterator].incorrect_answers[2], response.results[iterator].correct_answer);

            while (ansArr.length > 0) {
                var randIndex = Math.floor(Math.random() * ansArr.length);
                var removed = ansArr.splice(randIndex, 1);
                randomizedArr.push(removed);
            }

            $("#answer1").html(randomizedArr[0]);
            $("#answer2").html(randomizedArr[1]);
            $("#answer3").html(randomizedArr[2]);
            $("#answer4").html(randomizedArr[3]);
        };

        $(".answers").on('click', function () {
            if (clickBool) {
                console.log('clicked again');
                if ($(this).html() == response.results[iterator].correct_answer) {
                    $("#display").html('correct!');
                    clearTimeout(tickerTwo);
                    clearTimeout(ticker);
                    clearTimeout(questionTimer);
                    correct++;
                    iterator++;
                    endPage();
                    clickBool = false;
                    $(this).css('background-color', 'green');
                    setTimeout(() => {
                        $(this).css('background-color', 'transparent');
                        clickBool = true;
                        timer(20000);
                        $("#display").empty();

                    }, 1200);

                } else {
                    $("#display").html('wrong!');
                    clearTimeout(tickerTwo);
                    clearTimeout(ticker);
                    clearTimeout(questionTimer);
                    wrong++;
                    iterator++;
                    endPage();
                    clickBool = false;
                    $(this).css('background-color', 'red');
                    $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'green');
                    setTimeout(() => {
                        $(this).css('background-color', 'transparent');
                        $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'transparent');
                        clickBool = true;
                        timer(20000);
                        $("#display").empty();

                    }, 1200);
                }
            }
        })

        function timer(t) {
            questionGenerator();
            countdown((t / 1000));
            tickerTwo = setTimeout(() => {
                $("#display").html('took too long!');
                iterator++;
                $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'green');
                endPage();
                clickBool = false;
                wrong++;
                clearInterval(questionTimer);
            }, t);
            ticker = setTimeout(() => {
                $("#display").empty();
                $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'transparent');
                questionGenerator();
                timer(20000);
                clickBool = true;
                countdown((t / 1000) + 1);
            }, t + 2000);
        };
        timer(20000);

        function countdown(s) {
            var timeleft = s;
            questionTimer = setInterval(function () {
                timeleft--;
                // document.getElementById("time").textContent = timeleft;
                $("#time").text(timeleft);
                if (timeleft <= 0) {
                    clearInterval(questionTimer);
                }
            }, 1000);
        }

        function endPage() {
            if (iterator == response.results.length) {
                $("#right").text(correct);
                $("#wrong").text(wrong);
                $("#game-div").toggle();
                $("#end").toggle();
                $("#restart").on('click', function () {
                    setTimeout(() => {
                        $(".modal").toggle();
                        $("#end").toggle();
                        var iterator = 0;
                        var correct = 0;
                        var wrong = 0;
                        var clickBool = true; 
                    }, 1000);
                })
            }
        }



    });


});


