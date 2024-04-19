document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById("resetButtonCat").addEventListener("click", function() {
        $("#resultCategory").empty();
    });

    document.getElementById("resetButton2Cat").addEventListener("click", function() {
        $("#SortBoxCategories").empty();
    });

    $.ajax({
        url: "https://dev-22001492.users.info.unicaen.fr/bikestores/categories",
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response.hasOwnProperty("categories") && Array.isArray(response.categories)) {
                $.each(response.categories, function(index, category) {
                    var row = $("<tr>");
                    var cell = $("<td>").text(category.category_id);
                    row.append(cell);
                    var cell2 = $("<td>").text(category.category_name);
                    row.append(cell2);
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
            var cell = $("<td>").text(category.category_id);
            row.append(cell);
            var cell2 = $("<td>").text(category.category_name);
            row.append(cell2);
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

    document.getElementById("sortByCat").addEventListener("click", () => {
        var column = $("input[name='radioSortCategory']:checked").val();
        var order = $("input[name='orderCat']:checked").val();
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+column+"/"+order ;
        loadCategories(actualUrl,"#SortBoxCategories");
    });

    document.getElementById("searchCategory").addEventListener("click", () => {
        var id = parseInt($("#idCategory").val());
        var attribute = $("input[name='searchCategory']:checked").val();
        var detail = "Detail requested : ";

        let actualUrl ;
        if (!isNaN(id) && attribute === "all"){
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+ id ;
        } else if (!isNaN(id) && attribute === "category_name") {
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+ id + "/category_name";
        }

        $.ajax({
            url: actualUrl,
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response !== null) {
                    var chaine ;
                    if (attribute === "all"){
                        chaine = "Category ID = "+ response.category_id + " | Category name = " + response.category_name ;
                    } else {
                        chaine = detail + response ;
                    }
                    var successBox = $("<div>").text(chaine).css({
                        "background-color": "black",
                        "outline": "solid",
                        "color": "white",
                        "padding": "10px",
                        "margin": "10px"
                    });
                    $("#resultCategory").append(successBox);
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#resultCategory").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("putCategory").addEventListener("click", () => {
        var id = parseInt($("#updateIDCategory").val());
        var newName = $("#newCategoryName").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+ id +"/"+encodeURIComponent(newName.replace(/ /g, "%20"));

        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "PUT",
            dataType: "json",
            success: function(response) {                
                if (response !== null) {
                    var successBox = $("<div>").text(response.status_message).css({
                        "background-color": "green",
                        "color": "white",
                        "padding": "10px",
                        "margin": "10px"
                    });
                    $("#ModifBoxCategory").append(successBox);
                    loadCategories("https://dev-22001492.users.info.unicaen.fr/bikestores/categories","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxCategory").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });


    });

    document.getElementById("addCategory").addEventListener("click", () => {
        var newName = $("#newCategoryName").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+encodeURIComponent(newName.replace(/ /g, "%20"));

        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "POST",
            dataType: "json",
            success: function(response) {                
                if (response !== null) {
                    var successBox = $("<div>").text(response.status_message).css({
                        "background-color": "green",
                        "color": "white",
                        "padding": "10px",
                        "margin": "10px"
                    });
                    $("#ModifBoxCategory").append(successBox);
                    loadCategories("https://dev-22001492.users.info.unicaen.fr/bikestores/categories","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxCategory").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("delCategory").addEventListener("click", () => {
        var id = parseInt($("#updateIDCategory").val());

        $.ajax({
            url: "https://dev-22001492.users.info.unicaen.fr/bikestores/categories/"+ id,
            type: "DELETE",
            dataType: "json",
            success: function(response) {                
                if (response !== null) {
                    var successBox = $("<div>").text(response.status_message).css({
                        "background-color": "green",
                        "color": "white",
                        "padding": "10px",
                        "margin": "10px"
                    });
                    $("#ModifBoxCategory").append(successBox);
                    loadCategories("https://dev-22001492.users.info.unicaen.fr/bikestores/categories","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxCategory").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });

    });

});
