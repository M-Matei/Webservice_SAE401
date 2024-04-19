document.addEventListener("DOMContentLoaded", (event) => {

    
    document.getElementById("resetButton").addEventListener("click", function() {
        location.reload();
    });

    $.ajax({
        url: "https://dev-22001492.users.info.unicaen.fr/bikestores/categories",
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response.hasOwnProperty("categories") && Array.isArray(response.categories)) {
                $.each(response.categories, function(index, category) {
                    var row = $("<tr>");
                    var cell = $("<td>").text(category.category_name);
                    row.append(cell);
                    $("#categoriesTable").append(row);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
        }
    });

    function displayCategories(categories) {
        $("#categoriesTable").empty(); 
        $.each(categories, function(index, category) {
            var row = $("<tr>");
            var cell = $("<td>").text(category.category_name);
            row.append(cell);
            $("#categoriesTable").append(row);
        });
    }


    function loadCategories(urlRequest, boxInfo) {
        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response.hasOwnProperty("categories") && Array.isArray(response.categories)) {
                    var categories = response.categories;
                    displayCategories(categories);
                    var successBox = $("<div>").text("Successful operation").css({
                        "background-color": "green",
                        "color": "white",
                        "padding": "10px",
                        "margin": "10px"
                    });
                    $(boxInfo).append(successBox);
                } else {
                    var errorMessage = response.status_message;
                    var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                });
                $(boxInfo).append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    }

    document.getElementById("sortBy").addEventListener("click", () => {
        var column = $("input[name='radioSort']:checked").val();
        var order = $("input[name='radioOrder']:checked").val();
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+column+"/"+order ;
        loadCategories(actualUrl,"#SortBox");
    });

});