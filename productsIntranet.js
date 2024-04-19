document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById("resetButton").addEventListener("click", function() {
        $("#resultProduct").empty();
    });
  
    document.getElementById("resetButton2").addEventListener("click", function() {
        $("#SortBox2").empty();
    });

    function displayProducts(products) {
        $("#productsTable").empty(); // Efface le contenu actuel du tableau
        $.each(products, function(index, product) {
            var row = $("<tr>");
            var cell = $("<td>").text(product.product_name);
            row.append(cell);
            var cell2 = $("<td>").text(product.brand);
            row.append(cell2);
            var cell3 = $("<td>").text(product.category);
            row.append(cell3);
            var cell4 = $("<td>").text(product.model_year);
            row.append(cell4);
            var cell5 = $("<td>").text(product.list_price);
            row.append(cell5);
            $("#productsTable").append(row);
        });
      }
    
      function loadProducts(startIndex, urlRequest, boxInfo) {
        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response.hasOwnProperty("products") && Array.isArray(response.products)) {
                    var products = response.products.slice(startIndex, startIndex + pageSize);
                    displayProducts(products);
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
    
      var startIndex = 0;
      var pageSize = 15;  // Nombre de produits à afficher par page
      var actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products" ;
    
      loadProducts(startIndex, actualUrl, "");
    
        $("#previousButton").click(function() {
            if (startIndex - pageSize >= 0) {
                startIndex -= pageSize;
                loadProducts(startIndex, actualUrl, "");
            }
        });
    
        $("#nextButton").click(function() {
            startIndex += pageSize;
            loadProducts(startIndex, actualUrl, "");
        });
    
    document.getElementById("sortBy").addEventListener("click", () => {
        var column = $("input[name='radioSort2']:checked").val();
        var order = $("input[name='radioOrder2']:checked").val();
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products/"+column+"/"+order ;
        loadProducts(startIndex, actualUrl,"#SortBox2");
    });


    document.getElementById("searchProduct").addEventListener("click", () => {
        var id = parseInt($("#idProduct").val());
        var attribute = $("input[name='searchProduct']:checked").val();
        var detail = "Detail requested : ";

        let actualUrl ;
        if (!isNaN(id) && attribute === "all"){
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products/"+ id ;
        } else if (!isNaN(id) && attribute != "all") {
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/products/"+ id + "/" + attribute;
        }

        $.ajax({
            url: actualUrl,
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response != null) {
                    var chaine ;
                    if (attribute === "all"){
                        chaine = "Product ID = "+ response.product_id + " | Brand name = " + response.brand +
                        " | Category Name = "+ response.category + " | Model year = " + response.model_year +
                        " | Price = "+ response.list_price ;
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
                    $("#resultProduct").append(successBox);
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#resultProduct").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

});