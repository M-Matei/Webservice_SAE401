document.addEventListener("DOMContentLoaded", (event) => {

    document.getElementById("resetButtonStore").addEventListener("click", function() {
        $("#resultStore").empty();
    });

    document.getElementById("resetButton2Store").addEventListener("click", function() {
        $("#SortBoxStores").empty();
    });

    $.ajax({
        url: "https://dev-22001492.users.info.unicaen.fr/bikestores/stores",
        type: "GET",
        dataType: "json",
        success: function(response) {
            if (response.hasOwnProperty("stores") && Array.isArray(response.stores)) {
                $.each(response.stores, function(index, store) {
                    var row = $("<tr>");
                    var cell = $("<td>").text(store.store_id);
                    row.append(cell);
                    var cell2 = $("<td>").text(store.store_name);
                    row.append(cell2);
                    var cell3 = $("<td>").text(store.phone);
                    row.append(cell3);
                    var cell4 = $("<td>").text(store.email);
                    row.append(cell4);
                    var cell5 = $("<td>").text(store.street);
                    row.append(cell5);
                    var cell6 = $("<td>").text(store.city);
                    row.append(cell6);
                    var cell7 = $("<td>").text(store.state);
                    row.append(cell7);
                    var cell8 = $("<td>").text(store.zip_code);
                    row.append(cell8);
                    $("#storesTable").append(row);
                });
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
        }
    });

    function displayCategories(stores) {
        $("#storesTable").empty(); 
        $.each(stores, function(index, store) {
            var row = $("<tr>");
                var cell = $("<td>").text(store.store_id);
                row.append(cell);
                var cell2 = $("<td>").text(store.store_name);
                row.append(cell2);
                var cell3 = $("<td>").text(store.phone);
                row.append(cell3);
                var cell4 = $("<td>").text(store.email);
                row.append(cell4);
                var cell5 = $("<td>").text(store.street);
                row.append(cell5);
                var cell6 = $("<td>").text(store.city);
                row.append(cell6);
                var cell7 = $("<td>").text(store.state);
                row.append(cell7);
                var cell8 = $("<td>").text(store.zip_code);
                row.append(cell8);
            $("#storesTable").append(row);
        });
      }


    function loadStores(urlRequest, boxInfo) {
        $.ajax({
            url: decodeURIComponent(urlRequest.replace(/%20/g, " ")),
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response.hasOwnProperty("stores") && Array.isArray(response.stores)) {
                    var stores = response.stores;
                    displayCategories(stores);
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

    document.getElementById("sortByStore").addEventListener("click", () => {
        var column = $("input[name='radioSortStore']:checked").val();
        var order = $("input[name='orderStore']:checked").val();
        actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"+column+"/"+order ;
        loadStores(actualUrl,"#SortBoxStore");
    });

    document.getElementById("searchStore").addEventListener("click", () => {
        var id = parseInt($("#idStore").val());
        var attribute = $("input[name='searchStore']:checked").val();
        var detail = "Detail requested : ";

        let actualUrl ;
        if (!isNaN(id) && attribute === "all"){
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"+ id ;
        } else if (!isNaN(id) && attribute != "all") {
            actualUrl = "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"+ id + "/" + attribute;
        }

        $.ajax({
            url: actualUrl,
            type: "GET",
            dataType: "json",
            success: function(response) {
                if (response != null) {
                    var chaine ;
                    if (attribute === "all"){
                        chaine = "Store ID = "+ response.store_id + " | Store name = " + response.store_name +
                        " | Phone = "+ response.phone + " | Email = " + response.email +
                        " | Street = "+ response.street + " | City = " + response.city +
                        " | State = "+ response.state+ " | Zip code = " + response.zip_code ;
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
                    $("#resultStore").append(successBox);
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#resultStore").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("putStore").addEventListener("click", () => {
        var newName = $("#newStoreName").val();
        var newPhone = $("#newPhoneStore").val();
        var newEmail = $("#newStoreEmail").val();
        var newStreet = $("#newStoreStreet").val();
        var newCity = $("#newStoreCity").val();
        var newState = $("#newStoreState").val();
        var newCode = $("#newStoreCode").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"
            +encodeURIComponent(newName.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newPhone.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newEmail.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newStreet.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newCity.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newState.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newCode.replace(/ /g, "%20")) ;

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
                    $("#ModifBoxStore").append(successBox);
                    loadStores("https://dev-22001492.users.info.unicaen.fr/bikestores/stores","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxStore").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("addStore").addEventListener("click", () => {
        var id = parseInt($("#updateIDStore").val());
        var newName = $("#newStoreName").val();
        var newPhone = $("#newPhoneStore").val();
        var newEmail = $("#newStoreEmail").val();
        var newStreet = $("#newStoreStreet").val();
        var newCity = $("#newStoreCity").val();
        var newState = $("#newStoreState").val();
        var newCode = $("#newStoreCode").val();
        var urlRequest = "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"+id+"/"
            +encodeURIComponent(newName.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newPhone.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newEmail.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newStreet.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newCity.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newState.replace(/ /g, "%20"))+"/"
            +encodeURIComponent(newCode.replace(/ /g, "%20")) ;

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
                    $("#ModifBoxStore").append(successBox);
                    loadStores("https://dev-22001492.users.info.unicaen.fr/bikestores/stores","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxStore").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });
    });

    document.getElementById("delStore").addEventListener("click", () => {
        var id = parseInt($("#updateIDStore").val());

        $.ajax({
            url: "https://dev-22001492.users.info.unicaen.fr/bikestores/stores/"+ id,
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
                    $("#ModifBoxStore").append(successBox);
                    loadStores("https://dev-22001492.users.info.unicaen.fr/bikestores/stores","");
                } else {
                  var errorMessage = response.status_message ;
                  var errorBox = $("<div>").text(errorMessage).css({
                    "background-color": "red",
                    "color": "white",
                    "padding": "10px",
                    "margin": "10px"
                  });
                  $("#ModifBoxStore").append(errorBox);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Erreur lors de la requête AJAX :", textStatus, errorThrown);
            }
        });

    });

});
