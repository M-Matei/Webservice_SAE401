document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById("resetButton").addEventListener("click", function() {
        $("#SortBox").empty();
    });

    document.getElementById("resetButton2").addEventListener("click", function() {
        $("#resultBrand").empty();
    });

    $.ajax({
        url: "https://dev-22001492.users.info.unicaen.fr/bikestores/brands",
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response.hasOwnProperty("brands") && Array.isArray(response.brands)) {
                $.each(response.brands, function(index, brand) {
                    var row = $("<tr>");
                    var cell = $("<td>").text(brand.brand_id);
                    row.append(cell);
                    var cell2 = $("<td>").text(brand.brand_name);
                    row.append(cell2);
                    $("#brandsTable").append(row);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
        }
    });

    function displayBrands(brands) {
        $("#brandsTable").empty(); 
        $.each(brands, function(index, brand) {
            var row = $("<tr>");
            var cell = $("<td>").text(brand.brand_id);
            row.append(cell);
            var cell2 = $("<td>").text(brand.brand_name);
            row.append(cell2);
            $("#brandsTable").append(row);
        });
      }


    function loadBrands(urlRequest, boxInfo) {
        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response.hasOwnProperty("brands") && Array.isArray(response.brands)) {
                    var brands = response.brands;
                    displayBrands(brands);
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
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+column+"/"+order ;
        loadBrands(actualUrl,"#SortBox");
    });

    document.getElementById("searchBrand").addEventListener("click", () => {
        var id = parseInt($("#idBrand").val());
        var attribute = $("input[name='searchBrand']:checked").val();
        var detail = "Detail requested : ";

        let actualUrl ;
        if (!isNaN(id) && attribute === "all"){
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+ id ;
        } else if (!isNaN(id) && attribute === "brand_name") {
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+ id + "/brand_name";
        }

        $.ajax({
            url: actualUrl,
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response !== null) {
                    var chaine ;
                    if (attribute === "all"){
                        chaine = "Brand ID = "+ response.brand_id + " | Brand name = " + response.brand_name ;
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
                    console.log(chaine);
                    $("#resultBrand").append(successBox);
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#resultBrand").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("putBrand").addEventListener("click", () => {
        var id = parseInt($("#updateIDBrand").val());
        var newName = $("#newBrandName").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+ id +"/"+encodeURIComponent(newName.replace(/ /g, "%20"));

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
                    $("#ModifBoxBrand").append(successBox);
                    loadBrands("https://dev-22001492.users.info.unicaen.fr/bikestores/brands","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxBrand").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });


    });

    document.getElementById("addBrand").addEventListener("click", () => {
        var newName = $("#newBrandName").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+encodeURIComponent(newName.replace(/ /g, "%20"));

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
                    $("#ModifBoxBrand").append(successBox);
                    loadBrands("https://dev-22001492.users.info.unicaen.fr/bikestores/brands","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxBrand").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("delBrand").addEventListener("click", () => {
        var id = parseInt($("#updateIDBrand").val());

        $.ajax({
            url: "https://dev-22001492.users.info.unicaen.fr/bikestores/brands/"+ id,
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
                    $("#ModifBoxBrand").append(successBox);
                    loadBrands("https://dev-22001492.users.info.unicaen.fr/bikestores/brands","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxBrand").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });

    });

});
