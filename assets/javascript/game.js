var url = "https://opentdb.com/api.php";

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

        var iterator = 0;
        function questionGenerator() {
            $("#question").html(response.results[0].question);

            var ansArr = [];
            var randomizedArr = [];
            ansArr.push(response.results[0].incorrect_answers[0], response.results[0].incorrect_answers[1], response.results[0].incorrect_answers[2], response.results[0].correct_answer);
            while (ansArr.length > 0) {
                var randIndex = Math.floor(Math.random() * ansArr.length);
                var removed = ansArr.splice(randIndex, 1);
                randomizedArr.push(removed);
            }

            $("#answer1").html(randomizedArr[0]);
            $("#answer2").html(randomizedArr[1]);
            $("#answer3").html(randomizedArr[2]);
            $("#answer4").html(randomizedArr[3]);

            $(".answers").on('click', function () {
                console.log('clicked again');
                if ($(this).html() == response.results[0].correct_answer) {
                    console.log('right!');

                } else {
                    console.log('wrong!');
                }
            })

        }
        questionGenerator();
        

    });

});


