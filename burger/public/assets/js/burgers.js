$(function () {
    $("#devour").on("click", function () {
        console.log("clicked");
        var id = $(this).data("id");
        var devoured = $(this).data("devoured");
        console.log(id);
        var eaten = {
            devoured: 1
        };

        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: eaten
        }).then(function () {

            location.reload();

        });
    });
    $(".form-group").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newBurger").val().trim()
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Added Burger");
            location.reload();
        });
    });
});