var url = "https://opentdb.com/api.php";
var ticker;
var tickerTwo;
var iterator = 0;
var correct = 0;
var wrong = 0;
var clickBool = true;
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
            $(".modal").css({ "display": "none", "z-index": "1" });
            $("#game-div").css({ "z-index": "2", "visibility": "visible" });
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
                    correct++;
                    iterator++;
                    clickBool = false;
                    $(this).css('background-color', 'green');
                    setTimeout(() => {
                        $(this).css('background-color', 'transparent');
                        clickBool = true;
                        timer(20000);
                        $("#display").empty();
                        // questionGenerator();
                    }, 1200);

                } else {
                    $("#display").html('wrong!');
                    clearTimeout(tickerTwo);
                    clearTimeout(ticker);
                    wrong++;
                    iterator++;
                    clickBool = false;
                    $(this).css('background-color', 'red');
                    $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'green');
                    setTimeout(() => {
                        $(this).css('background-color', 'transparent');
                        $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'transparent');
                        clickBool = true;
                        timer(20000);
                        $("#display").empty();
                        // questionGenerator();
                    }, 1200);
                }
            }
        })

        function timer(t) {
            questionGenerator();
            tickerTwo = setTimeout(() => {
                $("#display").html('took too long!');
                iterator++;
                $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'green');
                clickBool = false;
                wrong++;
            }, t);
            ticker = setTimeout(() => {
                $("#display").empty();
                $("p:contains('" + response.results[iterator - 1].correct_answer + "')").css('background-color', 'transparent');
                
                questionGenerator();
                timer(20000);
                clickBool = true;
            }, t + 2000);
        };
        timer(20000);
        // questionGenerator();





    });


});


