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

        for (var q in response.results) {
            setTimeout(() => {
                
            }, 30000);


        }


    });

});


