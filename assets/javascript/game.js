var url = "https://opentdb.com/api.php";
var ticker;
var iterator = 0;
var timer_is_on = 0;
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
            console.log('clicked again');
            if ($(this).html() == response.results[iterator].correct_answer) {
                $("#display").html('correct!');
                // clearTimeout(ticker);
                iterator++;
                setTimeout(() => {
                    // timer(20000);
                    $("#display").empty();
                    questionGenerator();
                }, 1200);

            } else {
                $("#display").html('wrong!');
                // clearTimeout(ticker);
                iterator++;
                setTimeout(() => {
                    // timer(20000);
                    $("#display").empty();
                    questionGenerator();
                }, 1200);
            }
        })
        // function timer(t) {

        //     questionGenerator();
        //     ticker = setTimeout(() => {
        //         iterator++;
        //         questionGenerator();
        //         timer(20000);
        //     }, t);
        // };
        // timer(20000);
        questionGenerator();





    });


});


